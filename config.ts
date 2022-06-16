// import BigNumber from 'bignumber.js'
// BigNumber.config({ EXPONENTIAL_AT: 60 })
import { parseEther, parseUnits } from "ethers/lib/utils";



export default {
	
    bsc_testnet: {
		TRUSTED_ADDRESS: "0x61456BF1715C1415730076BB79ae118E806E74d2",
        BRIDGE_ADDRESS: "",
	},

	rinkeby: {
		TRUSTED_ADDRESS: "0xFD4973FeB2031D4409fB57afEE5dF2051b171104",
        BRIDGE_ADDRESS: "0x94fC1C8DF1A196C5c65C061682D9E7D7116068b1",
	},

	bsc: {
		TRUSTED_ADDRESS: "0x61456BF1715C1415730076BB79ae118E806E74d2",
		// TRUSTED_ADDRESS: "0x86C80a8aa58e0A4fa09A69624c31Ab2a6CAD56b8",
        BRIDGE_ADDRESS: "",
        // BRIDGE_ADDRESS: "",
	},

	mainnet: {
		TRUSTED_ADDRESS: "0x84a0856b038eaAd1cC7E297cF34A7e72685A8693",
        BRIDGE_ADDRESS: "",
	}
} as { [keys: string]: any }