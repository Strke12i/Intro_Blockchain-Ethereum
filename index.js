
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
var contractAddress="0x6E6A99A70A12445583D49e63f2f0D6D3C298B245"

var abi=[
	{
		"inputs": [],
		"name": "getUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

contract=new web3.eth.Contract(abi, contractAddress);
var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Falha ao obter conta");
    return;
  }
  if (accounts.length == 0) {
    alert("Não foi possível acessar contas");
    return;
  }
  account = accounts[0];
  console.log('Conta: ' + account);
  web3.eth.defaultAccount = account;
});

function setUser() {
  name = $("#userName").val();
  age = $("#userAge").val();
  contract.methods.setUser(name, age).send({from: account}).then( function(tx) { 
    console.log("Usuário registrado na transação: ", tx); 
  });
  $("#userName").val('');
  $("#userAge").val('')
}

function getUser() {
  contract.methods.getUser().call().then( function( result ) {
    console.log(result[0], result[1])
    document.getElementById('user').innerHTML = ("Nome: " + result[0] + " " + "Idade:  " + result[1]);
  });    
}
