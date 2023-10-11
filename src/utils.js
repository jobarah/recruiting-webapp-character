export const getModifierCount = (value) => {
    const modifierValue = value - 10;
  
    /*
      the readme mentions an example with the attribute value being above 10,
      however, the example itself has a negative modifier value because the attribute is below 10,
      I am not quite sure which one is the correct one, so I will leave the code as it is,
      the section commented would be the validations needed if the attribute value would have to indeed be above 10
    */
  
    // if (value > 10) {
      return Math.floor(modifierValue / 2);
    // }
  
    // return 0;
  }