import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import engagementHelper from "./EngagementHelper";
import { channels, messageCountList } from "./mocks/chart-mock-data";
import { useMemo } from "react";

const EngagementMessagesOverTime = () => {
  const options = useMemo(
    () =>
      engagementHelper.engagementMessageOverTimeChartOptions(
        messageCountList,
        channels
      ),
    [messageCountList, channels] // warning for now, but important for optimizing when actual state dependencies are present
    // will be more meaningful when data is not mock
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementMessagesOverTime;
