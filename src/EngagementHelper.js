// ## Task:
// 1. Need to create `EngagementHelper.engagementMessageOverTimeChartOptions` which returns correct `options` for `HighchartReact`
// 2. Some `channels` might have messages on multiple dates, some only on a single date.
// 3. only show channels that have messages for more than 1 date.
// 4. **Cursor hover should info as shown in the image. Code needs to be optimized.**

import Highcharts from "highcharts";

export default {
  engagementMessageOverTimeChartOptions(messageCountList, channels) {
    const data = messageCountList.reduce((old, item) => {
      const channel = channels.find((channel) => channel.id === item.channelId);
      if (!channel) return old;
      if (old[item.channelId]) {
        old[item.channelId].data.push([
          new Date(item.timeBucket).getTime(),
          parseInt(item.count),
        ]);
      } else {
        old[item.channelId] = {
          name: channel.label,
          data: [[new Date(item.timeBucket).getTime(), parseInt(item.count)]],
          type: "line",
        };
      }

      return old;
    }, {});

    return {
      title: {
        text: "Chart Task",
      },
      series: Object.values(data).filter((item) => item.data.length > 1),
      xAxis: {
        type: "datetime",
      },
      tooltip: {
        formatter: function () {
          const seriesName = this.series.name;
          const count = this.point.y;
          const date = Highcharts.dateFormat("%e %b", new Date(this.x));

          return `<b>${seriesName}</b><br/>${count} messages on ${date}`;
        },
      },
    };
  },
};
