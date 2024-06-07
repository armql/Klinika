import {useQuery} from 'react-query';
import {useCallback, useEffect, useState} from "react";
import axios_instance from "../../../services/axios.ts";

interface Metric {
    value: number;
    creationDate: Date;
}

export default function HandleMetricsUser() {
    const [metricsState, setMetricsState] = useState<Metric[] | undefined>(undefined);
    const [userCount, setUserCount] = useState<number | undefined>(undefined);

    const fetchMetrics = useCallback(async (): Promise<Metric[]> => {
        const final = await axios_instance.get('Metrics/all').then((response) => {
            return response.data.registeredMetrics;
        });
        setUserCount(final);
        return final;
    }, []);

    const fetchUserCount = useCallback(async (): Promise<number> => {
        const {data} = await axios_instance.get('Account/count');
        return data.usersCount;
    }, []);

    const createMetricIfNotExists = useCallback(async (value: number): Promise<void> => {
        const metrics = await fetchMetrics();
        const latestMetricValue = metrics[metrics.length - 1]?.value;
        if (latestMetricValue !== value) {
            const newMetric = {value: value};
            const {data} = await axios_instance.post('Metrics/create-user', newMetric);
            console.log('Metric created:', data);
        } else {
            console.log('Metric with this value already exists');
        }
    }, [fetchMetrics]);

    const {data: count, refetch: refetchCount} = useQuery('userCount', fetchUserCount, {enabled: false});
    const {data: metrics, refetch: refetchMetrics} = useQuery('metrics', fetchMetrics, {enabled: false});

    useQuery('createMetric', () => {
        if (typeof count === 'number') {
            return createMetricIfNotExists(count);
        }
    }, {
        enabled: !!count,
        onSuccess: () => {
            refetchMetrics();
        },
    });

    useEffect(() => {
        refetchCount();
    }, [refetchCount]);

    useEffect(() => {
        setMetricsState(metrics);
    }, [metrics]);

    return {metricsState, userCount, refetchCount};
}