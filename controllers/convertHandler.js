class ConvertHandler {
  constructor() {}
  
  getNum(input) {
    const index = /[a-z]/i.exec(input).index;
    const number = input.slice(0, index);
    const slashIndex = number.search("/");
    
    if (number === "") return 1;
    if (slashIndex === -1) return number;
    
    const splitBySlash = number.split("/");
    
    if (splitBySlash.length === 2) {
      const calcResult = splitBySlash[0] / splitBySlash[1];
      
      return calcResult === Infinity ? "invalid number" : calcResult;
    } else {
      return "invalid number";
    }
  };
  
  getUnit(input) {
    const validUnits = ["gal","l","mi","km","lbs","kg","GAL","L","MI","KM","LBS","KG"];
    const index = /[a-z]/i.exec(input).index;
    const unit = input.slice(index);
    
    return validUnits.includes(unit) ? unit : "invalid unit";
  };
  
  getReturnUnit(initUnit) {
    const convertUnitsTable = {
      gal: "l",
      l: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
      GAL: "L",
      L: "GAL",
      MI: "KM",
      KM: "MI",
      LBS: "KG",
      KG: "LBS"
    };
    
    return (initUnit === "invalid unit") ? "invalid unit" : convertUnitsTable[initUnit];
  };

  spellOutUnit(unit) {
    const spellOutTable = {
      gal: "gallons",
      l: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
      GAL: "gallons",
      L: "liters",
      MI: "miles",
      KM: "kilometers",
      LBS: "pounds",
      KG: "kilograms"
    };
    
    return spellOutTable[unit];
  };
  
  convert(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    if (initNum === "invalid number") return "invalid number";
    if (initUnit === "invalid unit") return parseFloat(initNum);
    
    let convertToUnit;
    if (initUnit === "gal" || initUnit === "l" || initUnit === "GAL" ||  initUnit === "L") convertToUnit = galToL;
    if (initUnit === "lbs" || initUnit === "kg" || initUnit === "LBS" ||  initUnit === "KG") convertToUnit = lbsToKg;
    if (initUnit === "mi" || initUnit === "km" || initUnit === "MI" ||  initUnit === "KM") convertToUnit = miToKm;
    
    if (initUnit === "gal" || initUnit === "lbs" || initUnit === "mi" || initUnit === "GAL" || initUnit === "LBS" || initUnit === "MI") {
      return parseFloat((initNum * convertToUnit).toFixed(5));
    } else {
      return parseFloat((initNum / convertToUnit).toFixed(5));
    }
  };
  
  getString(initNum, initUnit, returnNum, returnUnit) {
    if (initNum === "invalid number" && initUnit === "invalid unit") return "invalid number and unit";
    if (initNum === "invalid number") return initNum;
    if (initUnit === "invalid unit") return initUnit;
    
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
