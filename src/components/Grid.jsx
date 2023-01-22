import { useRef, useEffect } from "react";
import { Grid } from "@babylonjs/gui";

const MainLayout = ({ screenRef }) => {
  const mainGrid = useRef(null);

  useEffect(() => {
    mainGrid.current.addColumnDefinition(1);
    mainGrid.current.addColumnDefinition(150, true);
    mainGrid.current.addColumnDefinition(0.1);
    mainGrid.current.addRowDefinition(1);
    mainGrid.current.addRowDefinition(200, true);
    mainGrid.current.addRowDefinition(0.2);

    screenRef.current.addControl(mainGrid.current);

    let subGrid = new Grid();
    subGrid.background = "white";
    subGrid.alpha = 0.7
    subGrid.addColumnDefinition(1);
    subGrid.addColumnDefinition(150, true);
    subGrid.addColumnDefinition(0.1);
    subGrid.addRowDefinition(1);
    subGrid.addRowDefinition(200, true);
    subGrid.addRowDefinition(0.2);

    mainGrid.current.addControl(subGrid, 2, 1);
  }, [screenRef]);

  return <grid ref={mainGrid} />;
};

export default MainLayout;
