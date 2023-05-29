import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryChart, VictoryBar, VictoryLabel, VictoryAxis, VictoryGroup, VictoryPie } from 'victory-native';
import firebase from '../../database/firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';

const Stat = () => {
  const [monthlyReportCounts, setMonthlyReportCounts] = useState([]);
  const [yearlyReportCounts, setYearlyReportCounts] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const totalReports = yearlyReportCounts.reduce((total, item) => total + item.count, 0);
  useEffect(() => {
    const fetchReportData = async () => {
      const reportsRef = firebase.firestore().collection('reports');
      let query = reportsRef;

      if (selectedYear) {
        const startDate = new Date(selectedYear, 0, 1);
        const endDate = new Date(selectedYear, 11, 31, 23, 59, 59);
        query = query.where('date', '>=', startDate).where('date', '<=', endDate);
      }

      const querySnapshot = await query.get();

      const reportCountsByType = {
        incident: 0,
        accident: 0,
        remonte: 0,
      };
      const reportCountsByMonth = {};

      querySnapshot.forEach((doc) => {
        const { type, date } = doc.data();

        const reportDate = date.toDate();

        const month = reportDate.getMonth();
        const year = reportDate.getFullYear();
        const currentYear = new Date().getFullYear();

        if (year === currentYear) {
          const key = `${month}-${type}`;
          reportCountsByMonth[key] = (reportCountsByMonth[key] || 0) + 1;
        }

        reportCountsByType[type] += 1;
      });

      const monthlyReportCountsArray = Object.keys(reportCountsByMonth).map((key) => {
        const [month, type] = key.split('-');
        const count = reportCountsByMonth[key];
        return { month, [type]: count };
      });

      const yearlyReportCountsArray = Object.keys(reportCountsByType).map((key) => {
        const type = key;
        const count = reportCountsByType[key];
        return { type, count };
      });

      setMonthlyReportCounts(monthlyReportCountsArray);
      setYearlyReportCounts(yearlyReportCountsArray);
    };

    fetchReportData();
  }, [selectedYear]);

  const monthLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <ScrollView>
      <Text style={styles.title}>Statistics</Text>
      <Picker
        style={styles.pickerContainer}
        selectedValue={selectedYear}
        onValueChange={(itemValue) => setSelectedYear(itemValue)}>
        <Picker.Item label="Select a year" value="" color="red" />
        <Picker.Item label={String(new Date().getFullYear())} value={String(new Date().getFullYear())} />
        <Picker.Item label={String(new Date().getFullYear() - 1)} value={String(new Date().getFullYear() - 1)} />
      </Picker>

      <Text style={{ fontWeight: 'bold', marginLeft: 15 }}>
        Monthly reports for {selectedYear || new Date().getFullYear()} :
      </Text>

      <View style={styles.chartInfo}>
        <MaterialCommunityIcons name="moon-full" size={22} color="orange" style={{ marginLeft: 15 }} />
        <Text>Incident</Text>
        <MaterialCommunityIcons name="moon-full" size={22} color="blue" style={{ marginLeft: 15 }} />
        <Text>Accident</Text>
        <MaterialCommunityIcons name="moon-full" size={22} color="red" style={{ marginLeft: 15 }} />
        <Text>Remonte</Text>
      </View>
      <VictoryChart>
        <VictoryGroup offset={10} colorScale={['red', 'orange', 'blue']}>
          <VictoryBar
            data={monthlyReportCounts}
            x="month"
            y={(datum) => datum.remonte || 0}
            style={{ data: { fill: 'red' } }}
            labels={({ datum }) => datum.remonte || ''}
            labelComponent={<VictoryLabel dy={-20} />}
          />
          <VictoryBar
            data={monthlyReportCounts}
            x="month"
            y={(datum) => datum.incident || 0}
            style={{ data: { fill: 'orange' } }}
            labels={({ datum }) => datum.incident || ''}
            labelComponent={<VictoryLabel dy={-20} />}
          />
          <VictoryBar
            data={monthlyReportCounts}
            x="month"
            y={(datum) => datum.accident || 0}
            style={{ data: { fill: 'blue' } }}
            labels={({ datum }) => datum.accident || ''}
            labelComponent={<VictoryLabel dy={-20} />}
          />
        </VictoryGroup>
        <VictoryAxis
          tickFormat={(x) => monthLabels[x]}
          style={{
            axisLabel: { padding: 30 },
            tickLabels: { angle: -45, fontSize: 8, textAnchor: 'end' },
          }}
        />
        <VictoryAxis dependentAxis />
      </VictoryChart>
      <Text style={{ fontWeight: 'bold', marginLeft: 15 }}>
        Total reports submitted in {selectedYear || new Date().getFullYear()} : {totalReports}
      </Text>
      <VictoryPie
        style={{ marginLeft: 50 }}
        width={300}
        height={200}
        data={yearlyReportCounts}
        x="type"
        y="count"
        colorScale={['orange', 'blue', 'red']}
        labels={({ datum }) => {
          
          return `${Math.round((datum.count / totalReports) * 100)}%`;
        }}
      />

    </ScrollView>
  );
};

export default Stat;

const styles = StyleSheet.create({

  title:{
    height : 40,
    backgroundColor : '#2b72ff',
    color : '#fff',
    textAlign : 'center',
    fontWeight : 'bold',
    fontSize : 20,
    paddingTop : 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 5,
  },
  pickerContainer: {
    borderColor : '#fff',
    width: '50%',
    alignItems : 'center',
  },
  chartInfo:{
    width: '100%',
    flexDirection : 'row',
    marginLeft : 30,
    marginBottom : 0,
    marginTop : 5,
  }
});