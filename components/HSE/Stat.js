import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryChart, VictoryBar, VictoryLabel , VictoryAxis, VictoryGroup, VictoryPie } from 'victory-native';
import firebase from '../../database/firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const Stat = () => {
  const [monthlyReportCounts, setMonthlyReportCounts] = useState([]);
  const [yearlyReportCounts, setYearlyReportCounts] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      const reportsRef = firebase.firestore().collection('reports');
      const querySnapshot = await reportsRef.get();
      
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
  }, []);

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
      <Text style={{fontWeight : 'bold' , marginLeft : 15}}>the Bar Chart for the reports submited in {new Date().getFullYear()} for each month</Text>

      <View style={styles.chartInfo}>
        <MaterialCommunityIcons name="moon-full" size={22} color="orange" style={{marginLeft: 15}} />
        <Text>Incident</Text>
        <MaterialCommunityIcons name="moon-full" size={22} color="blue" style={{marginLeft: 15}}/>
        <Text>Accident</Text>
        <MaterialCommunityIcons name="moon-full" size={22} color="red" style={{marginLeft: 15}}/>
        <Text>Remonte</Text>
      </View>
      <VictoryChart >
        <VictoryGroup offset={10} colorScale={['red', 'orange', 'bluev']}>
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
        <VictoryAxis tickFormat={(x) => monthLabels[x]}           
            style={{
            axisLabel: { padding: 30 },
            tickLabels: { angle: -45, fontSize: 8, textAnchor: 'end' },
          }} 

          />
        <VictoryAxis
          dependentAxis

        />
      </VictoryChart>
        <Text style={{fontWeight : 'bold' , marginLeft : 15}}>the Pie Chart for the reports submited in {new Date().getFullYear()} </Text>
        <VictoryPie
          style={{ marginLeft: 50 }}
          width={300}
          height={200}
          data={yearlyReportCounts}
          x="type"
          y="count"
          colorScale={['orange', 'blue', 'red']}
          labels={({ datum }) => {
            const totalReports = yearlyReportCounts.reduce((total, item) => total + item.count, 0);
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
  chartInfo:{
    width: '100%',
    flexDirection : 'row',
    marginLeft : 30,
    marginBottom : 0,
    marginTop : 5,
  }
});