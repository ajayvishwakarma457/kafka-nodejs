function assignDriver(location) {
    const drivers = {
      Mumbai: ["Amit", "Pooja", "Vikram"],
      Delhi: ["Ravi", "Neha", "Asha"],
      Default: ["John", "Jane"],
    };
  
    const available = drivers[location] || drivers.Default;
    const random = Math.floor(Math.random() * available.length);
    return available[random];
  }
  
  module.exports = { assignDriver };
  