using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stripe;
using System.Collections.Generic;
using System.Threading.Tasks;
using Klinika.Server.Models;
using Klinika.Server.Services;
using MongoDB.Bson;

namespace Klinika.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeeController : Controller
    {
        private readonly string _stripeSecretKey;
        private readonly FeeServices _feeServices;

        public FeeController(IConfiguration configuration, FeeServices feeServices)
        {
            _stripeSecretKey = configuration.GetSection("Stripe:SecretKey").Value;
            StripeConfiguration.ApiKey = _stripeSecretKey;
            _feeServices = feeServices;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllFees()
        {
            var fees = await _feeServices.GetAllFeesAsync();
            foreach (var fee in fees)
            {
                Console.WriteLine(fee._id);
            }
            return Ok(fees);
        }
        
        [HttpPost("cleanup")]
        public async Task<IActionResult> RemoveFee(PurchaseProductRequest request)
        {
            if (string.IsNullOrEmpty(request.userId) || string.IsNullOrEmpty(request.specializationName))
            {
                return BadRequest(new { error = "User ID and specialization name must be provided." });
            }

            var feeId = new ObjectId("6657212297a1aaaf1e124ee6"); // Replace with the actual fee ID
            var fee = await _feeServices.GetFeeAsync(feeId);

            if (fee == null)
            {
                return NotFound(new { error = $"Fee with ID {feeId} not found." });
            }

            var specialization = fee.Specializations.FirstOrDefault(s => s.name == request.specializationName);
            if (specialization == null)
            {
                return NotFound(new { error = $"Specialization {request.specializationName} not found in fee." });
            }

            if (!specialization.feeReleased.Contains(request.userId))
            {
                return BadRequest(new { error = $"Fee not released for this user for {request.specializationName}." });
            }

            specialization.feeReleased.Remove(request.userId);
            await _feeServices.UpdateFeeAsync(feeId, fee);

            return Ok(new { message = $"Fee for user {request.userId} for specialization {request.specializationName} has been removed." });
        }
        
        [HttpPost("purchase")]
        public async Task<IActionResult> PurchaseProduct(PurchaseProductRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.userId) || string.IsNullOrEmpty(request.specializationName))
                {
                    return BadRequest(new { error = "User ID and specialization name must be provided." });
                }

                var feeId = new ObjectId("6657212297a1aaaf1e124ee6");
                var fee = await _feeServices.GetFeeAsync(feeId);
        
                if (fee == null)
                {
                    return NotFound(new { error = $"Fee with ID {feeId} not found." });
                }
                var specialization = fee.Specializations.FirstOrDefault(s => s.name == request.specializationName);
                if (specialization == null)
                {
                    return NotFound(new { error = $"Specialization {request.specializationName} not found in fee." });
                }

                if (specialization.feeReleased.Contains(request.userId))
                {
                    return BadRequest(new { error = $"Fee already released for this user for {request.specializationName}." });
                }

                var options = new PaymentIntentCreateOptions
                {
                    Amount = 2000,
                    Currency = "eur",
                    Metadata = new Dictionary<string, string>
                    {
                        { "product_id", "prod_QBlyFGkFrzpjCc" }
                    }
                };
                var service = new PaymentIntentService();
                var paymentIntent = await service.CreateAsync(options);
                specialization.feeReleased.Add(request.userId);
                await _feeServices.UpdateFeeAsync(feeId, fee);

                return Ok(new { clientSecret = paymentIntent.ClientSecret });
            }
            catch (Exception ex)
            {
                // Handle any exceptions (e.g., invalid product ID, Stripe API errors)
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}