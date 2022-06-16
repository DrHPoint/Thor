//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

import "hardhat/console.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract DoctorTheme is ERC2771Context {

    enum Doctors {J_Hurt, W_Hartnell, P_Troughton, J_Pertwee, T_Baker, P_Davison,
        C_Baker, S_McCoy, P_McGann, C_Eccleston, D_Tennant, M_Smith, P_Capaldi }

    mapping (Doctors => string) public Phrases;
    mapping (address => bool) vote;
    mapping (Doctors => uint256) summary;
    
    constructor(address trustedForwarder) ERC2771Context(trustedForwarder)  {

        Phrases[Doctors.J_Hurt] = "No More War!";
        Phrases[Doctors.W_Hartnell] = "Hmmmm...?";
        Phrases[Doctors.P_Troughton] = "When I say 'run' - run!";
        Phrases[Doctors.J_Pertwee] = "And now listen to me!";
        Phrases[Doctors.T_Baker] = "Do you want marmalade?";
        Phrases[Doctors.P_Davison] = "Brilliant!";
        Phrases[Doctors.C_Baker] = "Surprisingly!";
        Phrases[Doctors.S_McCoy] = "Somewhere Else";
        Phrases[Doctors.P_McGann] = "I Know Who I Am";
        Phrases[Doctors.C_Eccleston] = "Fantastic";
        Phrases[Doctors.D_Tennant] = "Allons-y!";
        Phrases[Doctors.M_Smith] = "Geronimo!";
        Phrases[Doctors.P_Capaldi] = "Nothing's sad until it's over, and then everything is.";
    }

    function voting(Doctors favorite) public {
        vote[_msgSender()] = true;
        summary[favorite]++;
    }
}