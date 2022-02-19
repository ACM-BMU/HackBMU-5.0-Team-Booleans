export const colorCoding = [
    "#64ad73",
    "#afd17c",
    "#d6e184", // blue
    "#fff18f", // yellow
    "#fdd576", // red
    "#fbb862", // green
    "#f59b56", // purple
    "#ee7d4f",
    "#e35e4e",
    "#de425b"
  ];

export const getColorHex = (val: any) => {
    if(val >= 0 && val < 10){
        return colorCoding[0];
    }else if(val >= 10 && val < 20){
      return colorCoding[1];
    }else if(val >= 20 && val < 30){
      return colorCoding[3];
    }else if(val >= 30 && val < 40){
      return colorCoding[4];
    }else if(val >= 40 && val < 50){
      return colorCoding[5];
    }else if(val >= 50 && val < 60){
      return colorCoding[6];
    }else if(val >= 60 && val < 70){
      return colorCoding[7];
    }else if(val >= 70 && val < 80){
      return colorCoding[8];
    }else if(val >= 80 && val < 90){
      return colorCoding[9];
    }else{
      return colorCoding[9];
    }
}