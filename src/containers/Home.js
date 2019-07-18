import React, { Component } from 'react';
import { LineChart, PieChart, BarChart } from 'react-chartkick';
import 'chart.js';
import Card from '@material-ui/core/Card';
import GaugeChart from 'react-gauge-chart';
import CardContent from '@material-ui/core/CardContent';

export class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-4">
          <Card>
            <CardContent>
              <LineChart data={{ '2017-05-13': 2, '2017-05-14': 5 }} />
            </CardContent>
          </Card>
        </div>
        <div className="col-sm-4">
          <Card>
            <CardContent>
              <PieChart data={{ Blueberry: 44, Strawberry: 23 }} />
            </CardContent>
          </Card>
        </div>
        <div className="col-sm-4">
          <Card>
            <CardContent>
              <BarChart data={[['X-Small', 5], ['Small', 27]]} />
            </CardContent>
          </Card>
        </div>
        <div className="col-sm-4 mt-3">
          <Card>
            <CardContent>
              <GaugeChart
                id="gauge-chart4"
                nrOfLevels={10}
                arcPadding={0.1}
                cornerRadius={3}
                percent={0.6}
              />{' '}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default Home;
