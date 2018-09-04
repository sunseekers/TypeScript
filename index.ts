//必填参数
function buildName(firstName:string,lastName:string) {
  return firstName + " " + lastName
}
let result0 = buildName(12, 12); //提示 12 类型的参数不能赋值给 string
let result1 = buildName('Bob')//提示应该有两个参数，但是只获得一个
let result2 = buildName('Bob','Adams','"sr')//提示应该有两个参数，但是只获得三个
let result3 = buildName("Bob", "Adams"); //参数和传入的参数一样，不提示

//实现参数可选功能，我们需要在参数名旁边加 ?，但是可选参数必须跟在参数后面
function selectParam(firstName:string,lastName?:string) {
  return firstName + " " + lastName
}
let selectParam1 = selectParam('bob')
let selectParam2 = selectParam('bob','Adam')
let selectParam2 = selectParam('bob','Adam')//两个变量无法重新声明

//我们可以为参数提供默认值，如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值
function param(firstName:string,lastName = 'Smith') {
  return firstName + ' ' + lastName
}
let param1 = param('bob')
let param2 = param('bob','Adam','kk')//提示参数应该是1-2个

//剩余参数，必要参数，默认参数和可选参数都是表示某一个参数，有时候不知道要操作多少个参数
function restParam (firstName:string,...restOfName:string[]) {
  return firstName + " " + restOfName.join(' ')
}
let employName = restParam ('Joseph',"Samuel","Bob")
//restParam 可以换一种形式
let restParamFun:(fname:string,...rest:string[]) => string = restParam

//this 的使用
interface Card {
  suit: string;
  card: number;
}
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this:Deck):()=>Card;
}
let deck:Deck = {
  suits:['hearts','spades','clubs'],
  cards:Array(52),
  createCardPicker:function(this:Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random()*52)
      let pickedSuit = Math.floor(pickedCard / 13);
      return { suit: this.suits[pickedSuit],card:pickedCard % 13}
    }
  }
} 
let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
//如果是JavaScript，会报错，此时this指向了window，但是TypeScript 不会报错，他指定了this会在哪个对象上面调用
alert("card: " + pickedCard.card + " of " + pickedCard.suit);
//this 在回调函数里面
class Handler {
  info: string;
  onClickBad(this:Handler,e:Event) {
    this.info = 'e.message';
  }
}
let h = new Handler()

function buildName1(firstName:[string],lastName:string) {
  return firstName + " " + lastName
}

interface NumberArray {
  [index:number]: string
}
let fibonacci: NumberArray = ['1','2','3','4']
//泛型
function identity<T>(arg:T):T {
  return arg;
}
let output = identity<string>("myString")

//泛型变量
function loggingIdentity<T>(arg:T[]):T[] {
  console.log(arg.length)
  return arg
}
function loggingIdentity1<T>(arg:Array<T>):Array<T> {
  console.log(arg.length)
  return arg
}
//接口,传给 printLabel 的对象实现了这个接口，我们只会关注值得外形，只要传入的对象满足上面提到的必要条件，那么他就是被允许的，不会检查属性的顺序，只要属性存在就好
interface LabelledValue {
  label:string
}
function printLabel (labelledObj:LabelledValue) {
  console.log(labelledObj.label)
}
let myObj = {size: 10,label:"Size 10 Object"}
printLabel(myObj)
//接口里的属性不全然是必须的，有些只是在某些条件下存在，或者根本不存在，我们可以使用 ？ 可选
interface SquareConfig {
  color?: string;
  width?:number
}
function createSquare(config:SquareConfig):{color:string;area:number;} {
  let newSquare = { color:'white',area:100}
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}
let mySquare = createSquare({color:"black"})

interface Point {
   x:number;
  readonly y:number;
}
let p1:Point = { x:10,y:10};
p1.x = 5

let a:number[] = [1,2,3,4,5]
let ro:ReadonlyArray<number> = a
ro[0] = 12
a = ro;
//可用类型断言重写
a = ro as number[]
//private 类
class Animal {
  private name:string
  constructor(theName:string) {this.name = theName}
}
new Animal("Cat").name//提示 name 只能在类中访问
//存取器
let passcode = 'secret passcode'
class Employee {
  private _fullName:string;
  get fullName():string {
    return this._fullName
  }
  set fullName(newName:string){
    if (passcode && passcode == "secret passcode") {
      this._fullName = newName
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}
let employee1 = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
let employee2 = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
let aaa= ()=>{
return 'kl'
}
