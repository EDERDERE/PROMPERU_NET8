import FindBusinessForm from "./components/FindBusinessForm.js";
import Instrucciones from "./components/Instructions.js";
import NavigationButtons from "./components/NavigationButtons.js";
import renderSectionTitle from "./components/renderSectionTitle.js";
import TestSteps from "./components/TestSteps.js";
import Results from "./components/results.js";
import { useState } from "./utils/useState.js";
import Quiz from "./components/Quiz.js";

const Render = (state) => {
  const component = useState("");

  const stepsHtml = state.inscriptions
    ? TestSteps(state.inscriptions)
    : TestSteps();

  if (state.currentStep !== "results") {
    if (!state.companyData) {
      const title = "Encuentra tu empresa";
      component.setState(
        stepsHtml + renderSectionTitle(title) + FindBusinessForm()
      );
    } else if (
      state.test.activeTest.hasInstructions &&
      state.currentStep == "intro"
    ) {
      const instructions = state.test.activeTest.instructions;
      const title = instructions.title;
      component.setState(
        TestSteps() +
          renderSectionTitle(title) +
          Instrucciones(instructions) +
          NavigationButtons(false, true, "", instructions.buttonText)
      );
    } else {
      const data = state.test?.activeTest?.elements[state.currentStep];
      const title = data?.title || state.test?.activeTest?.testType.label;
      component.setState(
        TestSteps() +
          renderSectionTitle(title) +
          Quiz(data) +
          NavigationButtons()
      );
    }
  } else {
    component.setState(Results);

    setTimeout(() => {
      var options = {
        series: [80],
        colors: ["#4E97CE"],
        chart: {
          height: 300,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "70%",
            },
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "rgba(78, 151, 206, 0.21)",
              startAngle: -90,
              endAngle: 90,
              opacity: 1,
            },
            dataLabels: {
              show: false,
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            gradientToColors: ["#4E97CE"],
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: "round",
        },
        labels: ["Innovación"],
      };

      document.querySelectorAll("#chart").forEach((item) => {
        const chart = new ApexCharts(item, options);
        chart.render();
      });
    }, 100);
  }
  const componentRender = component.getState();

  return componentRender;
};

export default Render;
