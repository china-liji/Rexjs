class a {}

class b extends a {
constructor(){ console.log(super()) }
a(){};b(){}
}

new b()
