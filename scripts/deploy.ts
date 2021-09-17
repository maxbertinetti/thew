import { ethers } from 'hardhat'

async function main() {
  const factory = await ethers.getContractFactory('Greeter')
  let contract = await factory.deploy('Hello, Hardhat!')

  console.log(
    `The address the Contract WILL have once mined: ${contract.address}`
  )

  console.log(
    `The transaction that was sent to the network to deploy the Contract: ${contract.deployTransaction.hash}`
  )

  console.log(
    'The contract is NOT deployed yet; we must wait until it is mined...'
  )

  await contract.deployed()
  console.log('Mined!')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
