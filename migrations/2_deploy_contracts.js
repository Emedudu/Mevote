const Booth = artifacts.require("Booth");

module.exports = function(deployer) {
  deployer.deploy(Booth);
};
