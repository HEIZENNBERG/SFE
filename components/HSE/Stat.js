import { View, Text } from 'react-native'
import React from 'react'
import { VictoryChart, VictoryBar, VictoryTheme, VictoryGroup, VictoryZoomContainer, VictoryAxis } from 'victory-native';

const data = [
    { month: 'January', remonte: getRandomValue(), incident: getRandomValue(), accident: getRandomValue() },
    { month: 'February', remonte: getRandomValue(), incident: getRandomValue(), accident: getRandomValue() },
    { month: 'March', remonte: getRandomValue(), incident: getRandomValue(), accident: getRandomValue() },
    { month: 'April', remonte: getRandomValue(), incident: getRandomValue(), accident: getRandomValue() },
    { month: 'May', remonte: getRandomValue(), incident: getRandomValue(), accident: getRandomValue() },
    { month: 'June', remonte: getRandomValue(), incident: getRandomValue(), accident: getRandomValue() },
    { month: 'July', remonte: getRandomValue(), incident: getRandomValue(), accident: getRandomValue() },
    { month: 'August', remonte: getRandomValue(), incident: getRandomValue(), accident: getRandomValue() },
    { month: 'September', remonte: getRandomValue(), incident: getRandomValue(), accident: getRandomValue() },
    { month: 'October', remonte: getRandomValue(), incident: getRandomValue(), accident: getRandomValue() },
    { month: 'November', remonte: getRandomValue(), incident: getRandomValue(), accident: getRandomValue() },
    { month: 'December', remonte: getRandomValue(), incident: getRandomValue(), accident: getRandomValue() },
  ];
  
  function getRandomValue() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  const Stat = () => {
    return (
      <View>
        <Text>Stat</Text>
        <VictoryChart theme={VictoryTheme.material} 
            >
            <VictoryGroup offset={10} colorScale={['blue', 'orange', 'red']} >
          <VictoryBar
            data={data}
            x="month"
            y={(datum) => datum.remonte}
            style={{ data: { fill: 'blue' } }}
          />
          <VictoryBar
            data={data}
            x="month"
            y={(datum) => datum.incident}
            style={{ data: { fill: 'orange' } }}
          />
          <VictoryBar
            data={data}
            x="month"
            y={(datum) => datum.accident}
            style={{ data: { fill: 'red' } }}
          />
          </VictoryGroup>
          <VictoryAxis
                      tickFormat={(x => `${x}`)}
          dependentAxis
          />
          <VictoryAxis
          style={{
            axisLabel: { padding: 30 },
            tickLabels: { angle: -45, fontSize: 8, textAnchor: 'end' },
          }}
        />
        </VictoryChart>
      </View>
    );
  };
  

export default Stat