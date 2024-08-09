import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

// Basic styles to replace custom UI components
const styles = `
  .card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px auto;
    max-width: 1000px;
  }
  .card-header { margin-bottom: 20px; }
  .card-content { }
  .select { margin-bottom: 20px; }
  .alert { 
    background-color: #f8d7da; 
    border: 1px solid #f5c6cb;
    color: #721c24;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  .tabs { margin-bottom: 20px; }
  .tab { 
    padding: 10px 20px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
  }
  .tab.active { 
    background-color: #007bff;
    color: white;
  }
`;

// Type definitions
type FinancialDataItem = {
  year: string;
  ev: number;
  hedgeAdjustedEv: number;
  ebitda: number;
  hedgeAdjustedEbitda: number;
};

type SnowRemovalDataItem = {
  year: string;
  unhedgedRevenue: number;
  putStrike: number;
  hedgedRevenue: number;
  revenueDifference: number;
};

type EvEbitdaDataItem = {
  category: string;
  multiple?: number;
  multipleMin?: number;
  multipleMax?: number;
};

type RevStabilizedDataItem = {
  name: string;
  EnterpriseValue: number;
  HedgeAdjustedEnterpriseValue: number;
  StabilizedHedgeAdjustedEnterpriseValue: number;
};

const FinancialDataVisualization: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<"ev" | "ebitda">("ev");
  const [activeTab, setActiveTab] = useState<
    "financial" | "snow" | "theory" | "revStabilized"
  >("financial");

  // Financial data
  const financialData: FinancialDataItem[] = [
    {
      year: "TTM",
      ev: 2641226000,
      hedgeAdjustedEv: 2724665600,
      ebitda: 294385421.31,
      hedgeAdjustedEbitda: 303685421.31,
    },
    {
      year: "9/30/2023",
      ev: 2153734961,
      hedgeAdjustedEv: 2343017961,
      ebitda: 243497451.78,
      hedgeAdjustedEbitda: 264897451.78,
    },
    {
      year: "9/30/2022",
      ev: 2145320000,
      hedgeAdjustedEv: 2063824000,
      ebitda: 210593894.18,
      hedgeAdjustedEbitda: 202593894.18,
    },
    {
      year: "9/30/2021",
      ev: 2636652000,
      hedgeAdjustedEv: 2535676000,
      ebitda: 208893360.8,
      hedgeAdjustedEbitda: 200893360.8,
    },
    {
      year: "9/30/2020",
      ev: 2341622600,
      hedgeAdjustedEv: 3152641400,
      ebitda: 184495950.2,
      hedgeAdjustedEbitda: 248395950.2,
    },
    {
      year: "9/30/2019",
      ev: 2939973891,
      hedgeAdjustedEv: 2833189891,
      ebitda: 220255760.49,
      hedgeAdjustedEbitda: 212255760.49,
    },
    {
      year: "9/30/2018",
      ev: 3285237604,
      hedgeAdjustedEv: 3173573604,
      ebitda: 235365926.64,
      hedgeAdjustedEbitda: 227365926.64,
    },
  ];

  const snowRemovalData: SnowRemovalDataItem[] = [
    {
      year: "TTM",
      unhedgedRevenue: 212700000,
      putStrike: 230000000,
      hedgedRevenue: 222000000,
      revenueDifference: 9300000,
    },
    {
      year: "9/30/2023",
      unhedgedRevenue: 200600000,
      putStrike: 230000000,
      hedgedRevenue: 222000000,
      revenueDifference: 21400000,
    },
    {
      year: "9/30/2022",
      unhedgedRevenue: 244200000,
      putStrike: 230000000,
      hedgedRevenue: 236200000,
      revenueDifference: -8000000,
    },
    {
      year: "9/30/2021",
      unhedgedRevenue: 281800000,
      putStrike: 230000000,
      hedgedRevenue: 273800000,
      revenueDifference: -8000000,
    },
    {
      year: "9/30/2020",
      unhedgedRevenue: 158100000,
      putStrike: 230000000,
      hedgedRevenue: 222000000,
      revenueDifference: 63900000,
    },
    {
      year: "9/30/2019",
      unhedgedRevenue: 239700000,
      putStrike: 230000000,
      hedgedRevenue: 231700000,
      revenueDifference: -8000000,
    },
    {
      year: "9/30/2018",
      unhedgedRevenue: 243700000,
      putStrike: 230000000,
      hedgedRevenue: 235700000,
      revenueDifference: -8000000,
    },
  ];

  const evEbitdaData: EvEbitdaDataItem[] = [
    { category: "High Variability", multiple: 8.42 },
    { category: "Low Variability", multiple: 15.44 },
    { category: "Non-stabilized Example", multiple: 9.5 },
    {
      category: "Potential After Stabilization",
      multipleMin: 11.5,
      multipleMax: 12.5,
    },
  ];

  const revStabilizedData: RevStabilizedDataItem[] = [
    {
      name: "ttm",
      EnterpriseValue: 2641226000.0,
      HedgeAdjustedEnterpriseValue: 2724665600.0,
      StabilizedHedgeAdjustedEnterpriseValue: 3331429071.77,
    },
    {
      name: "9/30/2023",
      EnterpriseValue: 2153734961.0,
      HedgeAdjustedEnterpriseValue: 2343017961.0,
      StabilizedHedgeAdjustedEnterpriseValue: 2874137351.81,
    },
    {
      name: "9/30/2022",
      EnterpriseValue: 2145320000.0,
      HedgeAdjustedEnterpriseValue: 2063824000.0,
      StabilizedHedgeAdjustedEnterpriseValue: 2469619570.05,
    },
    {
      name: "9/30/2021",
      EnterpriseValue: 2636652000.0,
      HedgeAdjustedEnterpriseValue: 2535676000.0,
      StabilizedHedgeAdjustedEnterpriseValue: 2937060934.9,
    },
    {
      name: "9/30/2020",
      EnterpriseValue: 2341622600.0,
      HedgeAdjustedEnterpriseValue: 3152641400.0,
      StabilizedHedgeAdjustedEnterpriseValue: 3648936508.44,
    },
    {
      name: "9/30/2019",
      EnterpriseValue: 2939973891.0,
      HedgeAdjustedEnterpriseValue: 2833189891.0,
      StabilizedHedgeAdjustedEnterpriseValue: 3258125923.52,
    },
    {
      name: "9/30/2018",
      EnterpriseValue: 3285237604.0,
      HedgeAdjustedEnterpriseValue: 3173573604.0,
      StabilizedHedgeAdjustedEnterpriseValue: 3628760189.17,
    },
  ];

  const formatLargeNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    return num.toFixed(2);
  };

  const calculateHedgeImpact = () => {
    let totalEvDifference = 0;
    let totalEbitdaDifference = 0;
    let totalEv = 0;
    let totalEbitda = 0;

    financialData.forEach((item) => {
      totalEvDifference += item.hedgeAdjustedEv - item.ev;
      totalEbitdaDifference += item.hedgeAdjustedEbitda - item.ebitda;
      totalEv += item.ev;
      totalEbitda += item.ebitda;
    });

    const evImpact = ((totalEvDifference / totalEv) * 100).toFixed(2);
    const ebitdaImpact = ((totalEbitdaDifference / totalEbitda) * 100).toFixed(
      2
    );

    return {
      evImpact,
      ebitdaImpact,
      evDollarValue: formatLargeNumber(totalEvDifference),
      ebitdaDollarValue: formatLargeNumber(totalEbitdaDifference),
    };
  };

  const calculateAverages = (data: RevStabilizedDataItem[]) => {
    const sum = data.reduce(
      (acc, curr) => ({
        EnterpriseValue: acc.EnterpriseValue + curr.EnterpriseValue,
        HedgeAdjustedEnterpriseValue:
          acc.HedgeAdjustedEnterpriseValue + curr.HedgeAdjustedEnterpriseValue,
        StabilizedHedgeAdjustedEnterpriseValue:
          acc.StabilizedHedgeAdjustedEnterpriseValue +
          curr.StabilizedHedgeAdjustedEnterpriseValue,
      }),
      {
        EnterpriseValue: 0,
        HedgeAdjustedEnterpriseValue: 0,
        StabilizedHedgeAdjustedEnterpriseValue: 0,
      }
    );

    const count = data.length;
    return {
      avgEnterpriseValue: sum.EnterpriseValue / count,
      avgHedgeAdjustedEnterpriseValue: sum.HedgeAdjustedEnterpriseValue / count,
      avgStabilizedHedgeAdjustedEnterpriseValue:
        sum.StabilizedHedgeAdjustedEnterpriseValue / count,
    };
  };

  const percentChange = (newValue: number, originalValue: number) =>
    ((newValue - originalValue) / originalValue) * 100;

  const { evImpact, ebitdaImpact, evDollarValue, ebitdaDollarValue } =
    calculateHedgeImpact();
  const averages = calculateAverages(revStabilizedData);
  const summaryStats = {
    hedgeAdjustmentImpact: percentChange(
      averages.avgHedgeAdjustedEnterpriseValue,
      averages.avgEnterpriseValue
    ),
    stabilizationImpact: percentChange(
      averages.avgStabilizedHedgeAdjustedEnterpriseValue,
      averages.avgHedgeAdjustedEnterpriseValue
    ),
  };

  const getFinancialChartData = () => {
    if (selectedMetric === "ev") {
      return financialData.map((item) => ({
        year: item.year,
        "Enterprise Value": item.ev,
        "Hedge Adjusted Enterprise Value": item.hedgeAdjustedEv,
      }));
    } else {
      return financialData.map((item) => ({
        year: item.year,
        EBITDA: item.ebitda,
        "Hedge Adjusted EBITDA": item.hedgeAdjustedEbitda,
      }));
    }
  };

  return (
    <div className="card">
      <style>{styles}</style>
      <div className="card-header">
        <h2>BrightView Financial Data Visualization</h2>
      </div>
      <div className="card-content">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "financial" ? "active" : ""}`}
            onClick={() => setActiveTab("financial")}
          >
            Financial Overview
          </button>
          <button
            className={`tab ${activeTab === "snow" ? "active" : ""}`}
            onClick={() => setActiveTab("snow")}
          >
            Snow Removal Hedge
          </button>
          <button
            className={`tab ${activeTab === "theory" ? "active" : ""}`}
            onClick={() => setActiveTab("theory")}
          >
            EV/EBITDA Theory
          </button>
          <button
            className={`tab ${activeTab === "revStabilized" ? "active" : ""}`}
            onClick={() => setActiveTab("revStabilized")}
          >
            Revenue Stabilization
          </button>
        </div>

        {activeTab === "financial" && (
          <>
            <div className="alert">
              <h3>Hedge Impact Summary</h3>
              <p>
                Overall impact on Enterprise Value: {evImpact}%, $
                {evDollarValue}
              </p>
              <p>
                Overall impact on EBITDA: {ebitdaImpact}%, ${ebitdaDollarValue}
              </p>
            </div>
            <div className="select">
              <select
                value={selectedMetric}
                onChange={(e) =>
                  setSelectedMetric(e.target.value as "ev" | "ebitda")
                }
              >
                <option value="ev">Enterprise Value</option>
                <option value="ebitda">EBITDA</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={getFinancialChartData()}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="year" />
                <YAxis tickFormatter={formatLargeNumber} />
                <Tooltip
                  formatter={(value, name) => [
                    formatLargeNumber(value as number),
                    name,
                  ]}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Legend />
                <Bar
                  dataKey={
                    selectedMetric === "ev" ? "Enterprise Value" : "EBITDA"
                  }
                  fill="#8884d8"
                />
                <Bar
                  dataKey={
                    selectedMetric === "ev"
                      ? "Hedge Adjusted Enterprise Value"
                      : "Hedge Adjusted EBITDA"
                  }
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {activeTab === "snow" && (
          <>
            <div className="alert">
              <h3>Snow Removal Hedge Strategy</h3>
              <p>
                BrightView uses a put option strategy with a strike price of
                $230M to hedge snow removal revenues.
              </p>
              <p>
                This protects against low snow seasons while allowing upside in
                high snow seasons.
              </p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={snowRemovalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="year" />
                <YAxis tickFormatter={formatLargeNumber} />
                <Tooltip
                  formatter={(value) => [
                    formatLargeNumber(value as number),
                    "Revenue",
                  ]}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Legend />
                <Line
                  type="linear"
                  dataKey="unhedgedRevenue"
                  stroke="#8884d8"
                  name="Unhedged Revenue"
                />
                <Line
                  type="linear"
                  dataKey="putStrike"
                  stroke="#ff7300"
                  name="Put Strike"
                />
                <Line
                  type="linear"
                  dataKey="hedgedRevenue"
                  stroke="#82ca9d"
                  name="Hedged Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
            <h3>Revenue Difference</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={snowRemovalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="year" />
                <YAxis tickFormatter={formatLargeNumber} />
                <Tooltip
                  formatter={(value) => [
                    formatLargeNumber(value as number),
                    "Revenue Difference",
                  ]}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="revenueDifference">
                  {snowRemovalData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.revenueDifference >= 0 ? "#000000" : "#FF0000"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {activeTab === "theory" && (
          <>
            <h3>EV/EBITDA in Weather-Affected Services</h3>
            <p>
              Revenue stabilization can significantly impact a company's
              valuation, particularly for weather-affected businesses in the
              service industry. This analysis explores how stabilizing revenue
              streams can increase EV/EBITDA multiples.
            </p>
            <h4>Weather-Affected Service Sectors</h4>
            <p>
              Several service sectors are particularly susceptible to weather
              impacts, including airlines, airport operators, cleaning services,
              maintenance and repair, and pest control. These industries often
              experience fluctuations in demand and operational challenges due
              to weather conditions.
            </p>
            <h4>Revenue Variability Grouping</h4>
            <ul>
              <li>
                <strong>High Variability:</strong> Airlines and airport
                operators
              </li>
              <li>
                <strong>Low Variability:</strong> Cleaning, maintenance &
                repair, and pest control services
              </li>
            </ul>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={evEbitdaData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="category" />
                <YAxis domain={[0, 20]} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="multiple"
                  fill="#8884d8"
                  name="EV/EBITDA Multiple"
                />
                <Bar
                  dataKey="multipleMin"
                  fill="#82ca9d"
                  name="Potential Range (Min)"
                />
                <Bar
                  dataKey="multipleMax"
                  fill="#ffc658"
                  name="Potential Range (Max)"
                />
              </BarChart>
            </ResponsiveContainer>
            <h4>Impact of Revenue Stabilization</h4>
            <p>
              Revenue stabilization can significantly enhance a company's
              valuation in weather-sensitive industries. For a business with a
              non-stabilized EV/EBITDA multiple of 9.5, achieving revenue
              stability could potentially increase this metric by 2 to 3 points,
              resulting in a new range of 11.5 to 12.5.
            </p>
            <p>
              This uplift reflects reduced risk perception and increased
              investor confidence associated with more predictable earnings
              streams, particularly valuable in sectors prone to weather-related
              fluctuations.
            </p>
            <h4>Connection to BrightView's Strategy</h4>
            <p>
              BrightView's snow removal hedge strategy aligns with this theory
              by stabilizing revenues in a weather-sensitive service sector. By
              implementing a put option strategy, BrightView aims to reduce
              revenue variability, potentially leading to a higher EV/EBITDA
              multiple and increased company valuation.
            </p>
          </>
        )}

        {activeTab === "revStabilized" && (
          <>
            <div className="alert">
              <h3>Revenue Stabilization Impact Summary</h3>
              <p>
                Average impact of hedge adjustment on Enterprise Value:{" "}
                {summaryStats.hedgeAdjustmentImpact.toFixed(2)}%
              </p>
              <p>
                Average impact of revenue stabilization on Hedge Adjusted
                Enterprise Value: {summaryStats.stabilizationImpact.toFixed(2)}%
              </p>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={revStabilizedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatLargeNumber} />
                <Tooltip
                  formatter={(value) => formatLargeNumber(value as number)}
                />
                <Legend />
                <Bar
                  dataKey="EnterpriseValue"
                  fill="#8884d8"
                  name="Enterprise Value"
                />
                <Bar
                  dataKey="HedgeAdjustedEnterpriseValue"
                  fill="#82ca9d"
                  name="Hedge Adjusted EV"
                />
                <Bar
                  dataKey="StabilizedHedgeAdjustedEnterpriseValue"
                  fill="#ffc658"
                  name="Stabilized Hedge Adjusted EV"
                />
              </BarChart>
            </ResponsiveContainer>

            <h3>Overall Comparison</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                layout="vertical"
                data={[averages]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" tickFormatter={formatLargeNumber} />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip
                  formatter={(value) => formatLargeNumber(value as number)}
                />
                <Legend />
                <Bar
                  dataKey="avgEnterpriseValue"
                  fill="#8884d8"
                  name="Avg Enterprise Value"
                />
                <Bar
                  dataKey="avgHedgeAdjustedEnterpriseValue"
                  fill="#82ca9d"
                  name="Avg Hedge Adjusted EV"
                />
                <Bar
                  dataKey="avgStabilizedHedgeAdjustedEnterpriseValue"
                  fill="#ffc658"
                  name="Avg Stabilized Hedge Adjusted EV"
                />
              </BarChart>
            </ResponsiveContainer>

            <div>
              <h3>Impact of Revenue Stabilization</h3>
              <p>
                This analysis demonstrates the potential impact of revenue
                stabilization on BrightView's Enterprise Value. The hedge
                adjustment initially impacts the Enterprise Value by{" "}
                {summaryStats.hedgeAdjustmentImpact.toFixed(2)}% on average.
                Further revenue stabilization could potentially increase the
                Hedge Adjusted Enterprise Value by an additional
                {summaryStats.stabilizationImpact.toFixed(2)}% on average.
              </p>
              <p>
                These figures illustrate the significance of both hedging
                strategies and revenue stabilization efforts in enhancing
                company valuation, particularly in weather-sensitive industries
                like landscaping and snow removal services.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FinancialDataVisualization;
