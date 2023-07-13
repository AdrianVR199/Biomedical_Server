import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT);
app.get('/.well-known/pki-validation/8CE71567C23CF4B61C412616C1775A5A.txt'), (req,res)=>{
    res.sendFile('../8CE71567C23CF4B61C412616C1775A5A.txt')
  }
console.log(`Server is running on port ${PORT}`);
