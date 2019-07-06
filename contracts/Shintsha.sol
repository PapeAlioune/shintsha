pragma solidity >= 0.5 .0;

import "./ERC721Full.sol";
import "./IERC20.sol";
//@dev the contract is not optimised for gas 
contract Shintsha is ERC721Full {

    /*==============Struct Definition Section==============*/
    /*
    *@dev represents a Product stored by the contract
    @atr owner  represents the owner of the Product
    @atr index id of the product managed by the token mapping
    @atr name the name of the product
    @atr value represents the value of the Product the value in T-Tokens (see documentation)
    @ar sellingPrice the price at which the product can be sold for in T-Tokens
    @atr category representst the categories the product falls under string seperated by semicolons if product falls in more than one category
    @atr active used to check if the current instance is active or not
    */
    struct Product {
        address owner;
        uint256 index;
        string name;
        uint256 value;
        uint256 sellingPrice;
        string category;
        bool active;
    }
    /*
    *@dev represents a player that play Tshintsha
    @atr id represents the id of the Farmer 
    @atr farmName represents the name of the farm
    @atr farmAddress the address of the farm
    @atr country the country with which the organic farm in located
    @atr earnings the total amount in TTokens the farmer has owns
    @atr registeredProducts represents all the registered products by the farmer 
    @atr soldProducts represents all the sold products by the farmer
    @atr acceptedInvestmentIds keeps track of all investments ids accepted by famer
    @atr rejectedInvestmentIds keeps track of all investments ids rejected by famer
    @atr investorsAccepted represents all investors that the farmer has accepted to invest in his product/farm
    @atr investorsrejected represents all investors that the farmer has rejected to invest in his product/farm
    @atr investorsPending represents all investors that the farmer hasnt accepted as investors 
    @notice all traded products between farmers are added and removed from the registeredProducts array
    @notice Famer address are generated when a farmer registers for the services
    */
    struct Farmer {
        address id;
        string farmName;
        string farmAddress;
        string country;
        uint256 earnings;
        mapping(uint256 => Product) registeredProducts;
        mapping(uint256 => Product) soldProducts;
        bytes32[] acceptedInvestmentIds;
        bytes32[] rejectedInvestmentIds;
        mapping(bytes32 => Investment) investmentsAccepted;
        mapping(bytes32 => Investment) investmentsrejected;
        mapping(bytes32 => Investment) investmentsPending;
        bool active;
    }
    /**
    @dev represents a potential investor
    @atr id represents the id of 
    @atr investmentPorposal a description of what the investor wishes to invest
    @atr submittedInvestments keeps track of all investments submitted by Investor
    @atr investments keeps track of all ivestments made by investor similar to above but accessed through the referenceid
    @atr rejectedInvestments keeps track of all rejected investments submitted by Investor
    @atr successfullInvestments keeps track of all successfull investments submitted by Investor
    @atr accepted indicates if this instance of the proposal has been accepted by Investor
    @atr active indicates if the instance submitted by investor is active or not
    @active represents
     */
    struct Investor {
        address id;
        mapping(bytes32 => Investment) submittedInvestments;
        mapping(bytes32 => Investment) rejectedInvestments;
        mapping(bytes32 => Investment) succesfullInvestments;
        bool active;
    }
    /**
    @dev represents a potential investor
    @atr id represents the id of 
    @atr investmentPorposal a description of what the investor wishes to invest
    @atr pending indicates if this instance of the proposal is still pending or not
    @atr accepted indicates if this instance of the proposal has been accepted by farmer
    @atr active indicates if the instance submitted by investor is active or not
    @active represents
     */
    struct Investment {
        address investor;
        string investmentPorposal;
        bool pending;
        bool accepted;
        bool active;
    }
    /*==============events Definition Section==============*/
    event emitId(uint256 tokenID);
    event emitProposalId(bytes32 referenceID);
    /*==============modifier Definition Section==============*/
    modifier onlyAdmin() {
        require(msg.sender == owner, "only owner can call this function");
        _;
    }
    /*==============contract variable Definition Section==============*/
    /*@dev maps a Product Id to its corresponding Product Item*/
    mapping(uint256 => Product) RegisteredProducts;
    mapping(address => Farmer) Farmers;
    mapping(address => Investor) RegisteredInvestors;
    address owner;
    uint256 investorRegPrice = 3 * 10 ** 18;
    uint256 currentIndexProducts; //@dev used to index each product in the token mapping
    IERC20 TToken;
    /*==============function Definition Section==============*/
    constructor(string memory name, string memory symbol, address tTokenaddress) public ERC721Full(name, symbol) {
        require(tTokenaddress != address(0), "Invalid T-Token address");
        TToken = IERC20(tTokenaddress);
        currentIndexProducts = 0;
        owner = msg.sender;
    }
    /*==============Farmer functions Definition Section==============*/

    function registerFarmer(string memory farmname, string memory farmAddress, string memory country) public returns(bool) {
        require(msg.sender != address(0), "Invalid sender address");
        require(!Farmers[msg.sender].active, "farmer already registered");
        Farmers[msg.sender].farmName = farmname;
        Farmers[msg.sender].farmAddress = farmAddress;
        Farmers[msg.sender].country = country;
        Farmers[msg.sender].earnings = 0;
        Farmers[msg.sender].id = msg.sender;
        Farmers[msg.sender].active = true;
        return true;
    }

    function farmerExist() public view returns(bool) {
        require(msg.sender != address(0), "Invalid sender address");
        return Farmers[msg.sender].active;
    }

    function registerProduct(uint256 value, string memory categories, uint256 sellingprice,string memory name) public returns(bool) {
        require(msg.sender != address(0), "Invalid sender address");
        require(value > 0, "Product value must be greater than 0");
        require(Farmers[msg.sender].active, "farmer not registered");
        require(sellingprice > 0, "selling price is required to be greater than 0");
        RegisteredProducts[currentIndexProducts].owner = msg.sender;
        RegisteredProducts[currentIndexProducts].index = currentIndexProducts;
        RegisteredProducts[currentIndexProducts].value = value;
        RegisteredProducts[currentIndexProducts].category = categories;
        RegisteredProducts[currentIndexProducts].active = true;
        RegisteredProducts[currentIndexProducts].name = name;
        RegisteredProducts[currentIndexProducts].sellingPrice = sellingprice;
        Farmers[msg.sender].registeredProducts[currentIndexProducts] = RegisteredProducts[currentIndexProducts];
        _mint(msg.sender, currentIndexProducts);
        currentIndexProducts++;
        return true;
    }

    function productExists(uint256 id) public view returns(bool) {
        require(msg.sender != address(0), "Invalid sender address");
        require(id >= 0, "product id must be equal to and greater than 0");
        return RegisteredProducts[id].active;
    }

    function tradeProduct(address to, uint256 productId) public returns(bool) {
        require(msg.sender != address(0), "Invalid sender address");
        require(to != address(0), "invalid trader destination address");
        require(Farmers[msg.sender].active, "farmer not registered");
        require(Farmers[to].active, "farmer to not  not registered");
        require(productId >= 0, "product id must be equal to and greater than 0");
        require(ownerOf(productId) == msg.sender, "You cannot trade a product you currently dont own");
        transferFrom(msg.sender, to, productId);
        RegisteredProducts[productId].owner = to;
        Farmers[to].registeredProducts[productId] = Farmers[msg.sender].registeredProducts[productId];
        delete Farmers[msg.sender].registeredProducts[productId];
        return true;
    }

    function buyProduct(address productowner, uint256 productId) public returns(bool) {
        require(msg.sender != address(0), "Invalid sender address");
        require(productowner != address(0), "invalid trader destination address");
        require(Farmers[msg.sender].active, "farmer not registered");
        require(Farmers[productowner].active, "product seller not  not registered");
        require(productId >= 0, "product id must be equal to and greater than 0");
        require(ownerOf(productId) == msg.sender, "You cannot trade a product you currently dont own");
        require(TToken.balanceOf(msg.sender) > 0 && TToken.balanceOf(msg.sender) >= (Farmers[productowner].registeredProducts[productId].sellingPrice), "insufficient token balance");
        require(Farmers[productowner].registeredProducts[productId].active, "product already sold");
        transferFrom(productowner, msg.sender, productId);
        RegisteredProducts[productId].owner = msg.sender;
        Farmers[msg.sender].registeredProducts[productId] = Farmers[productowner].registeredProducts[productId];
        delete Farmers[productowner].registeredProducts[productId];
        return TToken.transferFrom(msg.sender, productowner, Farmers[productowner].registeredProducts[productId].sellingPrice);
    }


    function acceptInvestment(bytes32 referenceid) public returns(bool) {
        require(msg.sender != address(0), "Invalid sender address");
        require(Farmers[msg.sender].active, "farmer not registered");
        
        return true;
    }

    function setBalance() public view returns(uint256) {
        require(msg.sender != address(0), "Invalid sender address");
        require(Farmers[msg.sender].active, "farmer not registered");
        return TToken.balanceOf(msg.sender);

    }

    /*==============Investors functions Definition Section==============*/
    function registerInvestor() public returns(bool) {
        require(msg.sender != address(0), "Invalid sender address");
        require(TToken.balanceOf(msg.sender) >= investorRegPrice, "insufficient token balance");
        require(!RegisteredInvestors[msg.sender].active, "Investor already registered");
      return true;

    }

    function investorExists() public view returns(bool) {
        require(msg.sender != address(0), "Invalid sender address");
        return RegisteredInvestors[msg.sender].active;
    }

  /*============Admin function Definition Section==============*/



}