import { grantRoleIfNotGranted } from "../utils/role";
import { createDeployFunction } from "../utils/deploy";

const constructorContracts = [
  "DataStore",
  "RoleStore",
  "EventEmitter",
  "MultichainVault",
  "MultichainGmRouter",
  "MultichainGlvRouter",
];

const func = createDeployFunction({
  contractName: "LayerZeroProvider",
  libraryNames: ["MultichainUtils"],
  dependencyNames: constructorContracts,
  getDeployArgs: async ({ dependencyContracts }) => {
    return constructorContracts.map((dependencyName) => dependencyContracts[dependencyName].address);
  },
  afterDeploy: async ({ deployedContract }) => {
    await grantRoleIfNotGranted(deployedContract.address, "CONTROLLER");
  },
});

export default func;
