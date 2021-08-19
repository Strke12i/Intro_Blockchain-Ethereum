pragma solidity >=0.7.0 <0.9.0;

contract Register{
 
    string private name;
    uint256 private age;
    
    function setUser(string memory _name, uint256 _age) public{
    
        name=_name;
        age=_age;
        
    }
    
    function getUser() public view returns(string memory,uint256){
        return (name,age);
    }
    
}