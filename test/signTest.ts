import EIP712Domain from "eth-typed-data";
import hre, { ethers, network } from "hardhat";

describe("Report", function () {

    const domain = new EIP712Domain({
        name: 'Kreolarge',               
        version: '2.4.97',                     
        chainId: 10798,                       
        verifyingContract: '0xbad0feed',  
        salt: 'holyDolly123'              
    })

    const Person = domain.createType('Person', {
        name: 'string',
        wallet: 'address'
    })

    const Report = domain.createType('Report', {
        from: 'Person',
        to: 'Person',
        content: 'string',
        date: 'uint256'
    })

    const localAddress = '0xD065f36871A57e650bDDFCE26CD42d1517028172';



    describe("EIP712", () => {

        let dora = new Person({
            name: 'Daria',
            wallet: '0x74154cb67d4f13fb2b7f28b482dce9002339b1fb'
        })

        let innocent = new Person({
            name: 'Innocent',
            wallet: '0xf2d4b8cf0b8edf2530a89ae2cdef5ee2b7837302'
        })

        let excuse = new Report({
            from: innocent,
            to: dora,
            content: 'Hello! How are you?'
        })

        let quilty = new Report({
            from: {
                name: 'Daria',
                wallet: '0x74154cb67d4f13fb2b7f28b482dce9002339b1fb'
            },
            to: {
                name: 'Innocent',
                wallet: '0xf2d4b8cf0b8edf2530a89ae2cdef5ee2b7837302'
            },
            content: 'Sorry! I ate your pudding'
        })

        it("Sign", async () => {

            console.log(await excuse.toSignatureRequest());

            await network.provider.request({
                method: "hardhat_impersonateAccount",
                params: [localAddress],
            });
            const SecondAddress = ethers.provider.getSigner(localAddress);

            const signature = excuse.sign(SecondAddress);

        });

    });

});