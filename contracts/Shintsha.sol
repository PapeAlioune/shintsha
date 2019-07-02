pragma solidity >= 0.5 .0;

import "./ERC721Full.sol";

//@dev the contract is not optimised for gas 
contract Shintsha is ERC721Full {

    /*==============Struct Definition Section==============*/
    /*
    *@dev represents a Product stored by the contract
    @atr owner  represents the owner of the Product
    @atr  id represents the unique identifier of the product
    @atr value represents the value of the Product
    @atr category representst the categories the product falls under
    @atr Description represents a description of what the Product is 
    @atr active used to check if the current instance is active or not
    */
    struct Product {
        address owner;
        bytes id;
        uint256 index;
        uint256 value;
        string[] category;
        string description;
        bool active;
    }
    /*
    *@dev represents a player that play Tshintsha
    @atr id represents the id of the Farmer its the hash(country,time,farmAddress)
    @atr farmName represents the name of the farm
    @atr registeredProducts represents all the registered products by the farmer 
    @atr soldProducts represents all the sold products by the farmer
    @atr investorsAccepted represents all investors that the farmer has accepted to invest in his product/farm
    @atr investorsrejected represents all investors that the farmer has rejected to invest in his product/farm
    @atr investorsPending represents all investors that the farmer hasnt accepted as investors 
    @notice all traded products between farmers are added and removed from the registeredProducts array
    */
    struct Farmer {
        bytes32 id;
        string farmName;
        string farmAddress;
        string country;
        uint256 earnings;
        Product[] registeredProducts;
        Product[] soldProducts;
        Investor[] investorsAccepted;
        Investor[] investorsrejected;
        Investor[] investorsPending;
        bool active;
    }
    /**
    @dev represents a potential investor
    @atr id represents the id of 
    @atr investmentPorposal a description of what the investor wishes to invest
    @atr submittedInvestments keeps track of all investments submitted by Investor
    @atr rejectedInvestments keeps track of all rejected investments submitted by Investor
    @atr successfullInvestments keeps track of all successfull investments submitted by Investor
    @atr accepted indicates if this instance of the proposal has been accepted by Investor
    @atr active indicates if the instance submitted by investor is active or not
    @active represents
     */
    struct Investor {
        address id;
        Investment[] submittedInvestments;
        Investment[] rejectedInvestments;
        Investment[] succesfullInvestments;
        bool active;
    }
    /**
    @dev represents a potential investor
    @atr id represents the id of 
    @atr investmentPorposal a description of what the investor wishes to invest
    @atr rejected indicates if this instance of the proposal has been rejected by farmer
    @atr accepted indicates if this instance of the proposal has been accepted by farmer
    @atr active indicates if the instance submitted by investor is active or not
    @active represents
     */
    struct Investment {
        address investor;
        string investmentPorposal;
        bool rejected;
        bool accepted;
        bool active;
    }
    /*==============events Definition Section==============*/
    event emitId(uint256 tokenID);
    /*==============modifier Definition Section==============*/
    /*==============contract variable Definition Section==============*/
    /*@dev maps a Product Id to its corresponding Product Item*/
    mapping(uint256 => Product) RegisteredProducts;
    mapping(bytes32 => Farmer) Farmers;
    mapping(address => Investor) RegisteredInvestors;
    uint256 currentIndexProducts;
    /*==============function Definition Section==============*/
    constructor(string memory name, string memory symbol) public ERC721Full(name, symbol) {
        currentIndexProducts = 0;
    }

//@dev i need to redesign the below method still implementing a way of generating wallets for farmers when they register
    function reigsterFarmer(string memory farmname, string memory farmAddress, string memory country) public returns(bool) {
        require(msg.sender != address(0), "Invalid sender address");
        bytes32  farmerId = keccak256(abi.encode(farmname, farmAddress, country));
        require(!Farmers[farmerId].active, "farmer already registered");
        Farmers[farmerId].farmName = farmname;
        Farmers[farmerId].farmAddress = farmAddress;
        Farmers[farmerId].country = country;
        Farmers[farmerId].earnings = 0;
        Farmers[farmerId].id = farmerId;
        Farmers[farmerId].active = true;
        //@dev we assign a new farmer this way to avoid having to allocate the sizes of all the arrays since we dont know how big of an array we will need
        return true;
    }
}