
import path from 'path';
exports.index = (req:String, res:{ sendFile: (arg0: string) => void; }): void=>{ 
   /* pug.renderFile('../view/index.pug', {
        name: 'Timothy'
      });*/
    //res.sendFile('Main Route');
    res.sendFile(path.join(__dirname,'../view/index.html'));
};