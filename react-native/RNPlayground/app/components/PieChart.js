import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { Text as NormalText } from 'native-base'

/**
 * Data is passed to this component as an array, as a prop
 * named 'data'.
 * Each element is to have the following attributes:
 * key (required) - A unique identifier of each slice.
 * value (required) - The numerical value of each slice.
 *    The sum needs not add to any particular value.
 * unit (optional) - A string that should follow the value.
 * fillColor (optional) - Fill color of this slice.
 * borderColor (optional, not implemented) - ...
 */
export default class PieChartWithCenteredLabels extends React.PureComponent {
  render() {

    if (!this.props.data) {
      return <NormalText>(Error: this chart has no data.)</NormalText>
    }
    const data = this.props.data
      .map(it => {return {
        key: it.key,
        amount: it.value,
        unit: it.unit,
        svg: {
          fill: it.fillColor
        }
      }});

    const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        // it's probably possible to vary either the label
        // size or its position based on the slice's size.
        // may also be good to control the value's
        // precision when it's converted to string.
        return (
          <Text
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={'white'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={24}
            stroke={'black'}
            strokeWidth={0.2}
          >
            {'' + data.amount + data.unit}
          </Text>
        );
      });
    };
    
    return (
      <PieChart
        style={{ height: 200 }}
        valueAccessor={({ item }) => item.amount}
        data={data}
        spacing={0}
        outerRadius={'95%'}
        innerRadius={'15%'}
      >
        <Labels />
      </PieChart>
    );
  }
}
