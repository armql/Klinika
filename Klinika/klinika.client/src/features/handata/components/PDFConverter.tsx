import {Circle, Document, Font, Page, Path, PDFViewer, StyleSheet, Svg, Text, View} from '@react-pdf/renderer';
import {zForm} from "../__handata.ts";
import {BulkItems} from "../store/zForm.ts";

Font.register({
    family: 'Inter',
    src: 'https://fonts.gstatic.com/l/font?kit=UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZ1rib2Ai-7mZDutNalxagdd001LHpJRaEpsGYavwLkK_GVU636O&skey=c491285d6722e4fa&v=v13',
    fontStyle: 'normal',
    fontWeight: 'normal',
});

const styles = StyleSheet.create({
    mainContainer: {
        padding: 12,
        backgroundColor: '#f7f7f7',
        color: '#333',
        fontFamily: 'Inter',
        fontSize: 14,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        color: '#000',
        padding: 12,
        marginBottom: 12,
    },
    headerText: {
        fontSize: 24,
    },
    headerDetails: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: 12,
        paddingLeft: 12,
        paddingRight: 12,
        color: '#515151',
        justifyContent: 'flex-start',
        gap: 12,
        alignItems: 'center',
    },
    headerDetailsBlock: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    },
    contentContainer: {
        marginTop: 12,
        paddingTop: 12,
        borderBottom: 1,
        fontSize: 10,
    },
    tableHeaderRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: 1,
        paddingTop: 6,
        paddingRight: 6,
        paddingLeft: 6,
        paddingBottom: 6,
        gap: 6,
        backgroundColor: '#70D68A',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 6,
        borderWidth: 0.1,
        borderColor: '#7aa95d',
        backgroundColor: '#f3fbef',
    },
    columnHeader: {
        fontSize: 10,
        width: '100%',
        color: '#081004',
    },
    cell: {
        display: 'flex',
        fontSize: 8,
        width: '100%',
        padding: 3,
        color: '#395430',
    },
    licenseDetails: {
        marginTop: 12,
        display: 'flex',
        flexDirection: 'row',
        fontSize: 12,
        color: '#515151',
        fontFamily: 'Inter',
        justifyContent: 'flex-end',
        gap: 12,
        alignItems: 'center',
    },
    licenseDetailsBlock: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 12,
        gap: 4,
    }
});

const date = new Date().toLocaleDateString();

type PDFProps = {
    selectedItemData: BulkItems[];
    headers: string[];
}

const MyDocument = ({selectedItemData, headers}: PDFProps) => {
    return (

        <Document>
            <Page style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Klinika</Text>

                    <Svg width="64" height="64" viewBox="0 0 244 244">
                        <Circle cx="122" cy="122" r="122" fill="#081004"/>
                        <Path
                            d="M244 122C244 97.2705 236.485 73.1249 222.45 52.7635C208.416 32.4021 188.525 16.7864 165.415 7.98616C142.304 -0.814055 117.065 -2.38324 93.0419 3.48658C69.0192 9.35641 47.3474 22.3881 30.8991 40.8543C14.4508 59.3205 4.00265 82.3494 0.939519 106.888C-2.12361 131.427 2.3429 156.318 13.7471 178.261C25.1512 200.204 42.9545 218.163 64.7972 229.758C86.6399 241.353 111.491 246.037 136.055 243.188L122 122H244Z"
                            fill="#18672C"
                        />
                        <Path
                            d="M243.091 107.132C240.228 83.8142 230.693 61.8185 215.632 43.788C200.57 25.7575 180.624 12.4591 158.188 5.49049C135.751 -1.47808 111.78 -1.82043 89.1545 4.50457C66.5286 10.8296 46.2101 23.5529 30.6401 41.146C15.0702 58.739 4.91106 80.4534 1.38328 103.68C-2.1445 126.907 1.10914 150.659 10.7533 172.082C20.3974 193.504 36.0219 211.687 55.7495 224.444C75.4771 237.202 98.4687 243.993 121.962 244L122 122L243.091 107.132Z"
                            fill="#71D68A"
                        />
                        <Path
                            d="M71.2358 174L88.6222 69.2727H117.054L110.099 111.614H111.531L149.986 69.2727H183.122L140.168 115.909L166.554 174H132.599L115.827 134.727L104.168 147.205L99.6676 174H71.2358Z"
                            fill="white"
                        />
                    </Svg>
                </View>
                <View style={styles.headerDetails}>
                    <View style={styles.headerDetailsBlock}>
                        {/*<Text>Data from:</Text>*/}
                        {/*<Text>Created by:</Text>*/}
                        <Text>Document creation date:</Text>
                    </View>
                    <View style={styles.headerDetailsBlock}>
                        {/*<Text>Specialization</Text>*/}
                        {/*<Text>Arlind</Text>*/}
                        <Text>{date}</Text>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.tableHeaderRow}>
                        {headers.map((header, index) => (
                            <Text key={index} style={styles.cell}>{header}</Text>
                        ))}
                    </View>
                    {selectedItemData.map((item, index: number) => (
                        <View key={index} style={styles.tableRow}>
                            {Object.values(item).map((value, i) => (
                                <Text key={i} style={styles.cell}>{value}</Text>
                            ))}
                        </View>
                    ))}
                </View>
                {/*<View style={styles.licenseDetails}>*/}
                {/*    <View style={styles.licenseDetailsBlock}>*/}
                {/*        <Text>Software licensed to:</Text>*/}
                {/*        <Text>License location:</Text>*/}
                {/*        <Text>Invoice created for:</Text>*/}
                {/*    </View>*/}
                {/*    <View style={styles.licenseDetailsBlock}>*/}
                {/*        <Text>QKUK</Text>*/}
                {/*        <Text>Prishtine</Text>*/}
                {/*        <Text>Arlind</Text>*/}
                {/*    </View>*/}
                {/*</View>*/}
            </Page>
        </Document>
    )
};

const PDFPreview = () => {
    const {selectedItemData, headers} = zForm();
    return (
        <PDFViewer style={{width: '100%', height: '90vh'}}>
            <MyDocument selectedItemData={selectedItemData} headers={headers}/>
        </PDFViewer>

    );
}

export default PDFPreview;
