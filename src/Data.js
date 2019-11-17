// api consumer for recursive data
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class Data extends Component {
  state = {
    Data: [],
    Attr: {
      0: 'name',
      1: 'type',
      2: 'content',
      3: 'action',
      4: 'id',
      5: 'subtype',
      6: 'folder',
      7: 'url',
      8: 'entity_type',
      9: 'file',
      10: 'oldname',
    },
    loading: "loaded",

  };

  componentDidMount (){
    this.Read();
  }



  CreateHelperName(IdentifierStart,IdentifierEnd,value,type){
    var Identifier = IdentifierStart+IdentifierEnd;

    var Data = this.state.Data;

    var SubjectSelector = Identifier;
    SubjectSelector = SubjectSelector.replaceAll("\\['", ".");
    SubjectSelector = SubjectSelector.replaceAll("\\']", "");
    var branch = eval(Identifier);

    var oldname = IdentifierEnd;
    oldname = oldname.replaceAll("\\['", "");
    oldname = oldname.replaceAll("\\']", "");


    // var Attr = this.state.Attr;
    branch[type] = value;



    // eval("delete "+Identifier);
    // eval(IdentifierStart+"['"+value+"']=branch");

    this.setState({
      Data: Data
    });



  }

  Create(event, IdentifierStart,IdentifierEnd, type){
    event.preventDefault();
    var Identifier = IdentifierStart+IdentifierEnd;

    var Data = this.state.Data;

    var Content = eval(Identifier);

    var Attr = this.state.Attr;
    var thing = eval("Content."+type);
    // alert(JSON.stringify(name, null, 2));
    Content[Attr[2]][[thing]] = {
      "type": type
    };

    var UrlMiddle = IdentifierStart;
    UrlMiddle = UrlMiddle.replaceAll("\\['", "/");
    UrlMiddle = UrlMiddle.replaceAll("'\\]", "");
    UrlMiddle = UrlMiddle.replace("Data", "");

    var UrlEnd = IdentifierEnd;
    UrlEnd = UrlEnd.replaceAll("\\['", "/");
    UrlEnd = UrlEnd.replaceAll("'\\]", "");

    // alert(UrlEnd);

    // var Attr = this.state.Attr;
    // if (typeof Content[Attr[10]] !== 'undefined') {
    //   var OldName = Content[Attr[10]]
    //   delete Content[Attr[10]];
    // } else {
    //   var OldName = null
    // }

    var URLPrefix = 'https://test-c6f20.firebaseio.com/Reports/Report_1';
    var URL = URLPrefix+UrlMiddle+UrlEnd+'.json'
    // alert(JSON.stringify(Content, null, 2));
    console.log(Content)
    axios.put(URL, Content)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  Read(){
    this.ReadHelper1 = function(Data)  {
      this.ReadHelper2 = function(Data, Attr)  {

        var result = {};

        Object.keys(Data).forEach(function(keyName){

          result[keyName] = {};

          if (Data[keyName].type == Attr[6]){

            if (typeof Data[keyName].content !== "undefined") {

              result[keyName][Attr[2]] = this.ReadHelper2( Data[keyName].content,Attr);
              // result[keyName][Attr[6]]= {}
            }

          } else {
            if (typeof Data[keyName].content !== "undefined") {

              result[keyName][Attr[2]] = Data[keyName].content;
            }
          }
          result[keyName][Attr[1]] = Data[keyName].type;
        }, this);



        return result;
      }
      var Attr = this.state.Attr;
      var result = {content: this.ReadHelper2(Data.content,Attr)};

      return result;
    }

    String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };


    // --------
    // online start
    // --------
    // this.setState({loading:"loading"});
    //
    // axios.get('https://test-c6f20.firebaseio.com/Reports/Report_1.json')
    // .then(response => {
    //   var Data = response.data;
    //   var Data = this.ReadHelper1(Data);
    //   var loading = "loaded";
    //   this.setState({
    //     // Data: Data,
    //     Data: Data,
    //     loading:loading
    //   });
    // }).catch(error => {
    //   console.log(error);
    //   this.setState({loading:"failed"});
    // });
    // --------
    // online end
    // --------

    // --------
    // offline start
    // --------
    var Data = {
      "content": {
        "_data": {
          "content": {
            "code": {
              "content": {
                "w3css": {
                  "content": "123",
                  "type": "file"
                },
                "w3cssd": {
                  "content": "123",
                  "type": "file"
                }
              },
              "type": "folder"
            }
          },
          "type": "folder"
        }
      }
    };
    var Data = this.ReadHelper1(Data);
    var loading = "failed";

    this.setState({
      // Data: Data,
      Data: Data,
      loading:loading
    });

    // --------
    // offline end
    // --------





  }

  UpdateHelperContents(Identifier,value){

    var Data = this.state.Data;
    eval(Identifier+"=value");
    // alert(Identifier);
    // var Data = this.Read(Data);
    this.setState({
      // Data: Data,
      Data: Data
    });
  }

  UpdateHelperName(IdentifierStart,IdentifierEnd,value){
    var Identifier = IdentifierStart+IdentifierEnd;

    var Data = this.state.Data;

    var SubjectSelector = Identifier;
    SubjectSelector = SubjectSelector.replaceAll("\\['", ".");
    SubjectSelector = SubjectSelector.replaceAll("\\']", "");
    var branch = eval(Identifier);

    var oldname = IdentifierEnd;
    oldname = oldname.replaceAll("\\['", "");
    oldname = oldname.replaceAll("\\']", "");

    var Attr = this.state.Attr;
    branch[Attr[10]] = oldname;

    // eval(Identifier+"= null");
    eval("delete "+Identifier);
    eval(IdentifierStart+"['"+value+"']=branch");
    // var Data = this.Read(Data);
    this.setState({
      // Data: Data,
      Data: Data
    });



  }

  Update(event, IdentifierStart,IdentifierEnd){
    event.preventDefault();
    var Identifier = IdentifierStart+IdentifierEnd;
    // var SendReadHelper2 = this.SendReadHelper2(IdentifierStart,IdentifierEnd);
    // this.SendReadHelper2 = function(IdentifierStart,IdentifierEnd){
      var Data = this.state.Data;
      // eval(IdentifierStart,IdentifierEnd+"['action']='update'");
      // var Identifier = IdentifierStart+IdentifierEnd;

      var Content = eval(Identifier);

      var UrlMiddle = IdentifierStart;
      UrlMiddle = UrlMiddle.replaceAll("\\['", "/");
      UrlMiddle = UrlMiddle.replaceAll("'\\]", "");
      UrlMiddle = UrlMiddle.replace("Data", "");


      var UrlEnd = IdentifierEnd;
      UrlEnd = UrlEnd.replaceAll("\\['", "/");
      UrlEnd = UrlEnd.replaceAll("'\\]", "");

      var Attr = this.state.Attr;
      if (typeof Content[Attr[10]] !== 'undefined') {
        var OldName = Content[Attr[10]]
        delete Content[Attr[10]];
      } else {
        var OldName = null
      }
      // return {
      //   UrlMiddle:UrlMiddle,
      //   UrlEnd:UrlEnd,
      //   Content:Content,
      //   OldName:OldName
      // };

      // var Data = this.state.Data;
      //
      // var ContentContent = {
      //   "Data": this.state.Content,
      //   "_token": "vcO9EvF6wZK0xEafB9Za7b43gO3Yhg56Lr6kB19D",
      //   "form": "data",
      // }
      // // var UrlSuffix = "";
      // this.setState({
      //   Content: {
      //     "Content": ContentContent,
      //     // "UrlSuffix": UrlSuffix
      //   }
      // });
    // }


    // var UrlMiddle = SendReadHelper2.UrlMiddle;
    // var UrlEnd = SendReadHelper2.UrlEnd;
    // var Content = SendReadHelper2.Content;



    // alert(JSON.stringify(SendReadHelper2, null, 2));

    // this.setState({
    //   Data: Data
    // });


    var URLPrefix = 'https://test-c6f20.firebaseio.com/Reports/Report_1';
    var URL = URLPrefix+UrlMiddle+UrlEnd+'.json'
    // alert(JSON.stringify(Content, null, 2));
    axios.put(URL, Content)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    if (OldName !== null) {
      var  OtherUrlEnd = OldName;
      var OtherURL = URLPrefix+UrlMiddle+"/"+OtherUrlEnd+'.json';

      // alert(OldName);
      // alert(OtherURL);
      axios.put(OtherURL, [])
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }


  }

  Delete(event, Identifier){
    event.preventDefault();

    var UrlEnd = Identifier;
    UrlEnd = UrlEnd.replaceAll("\\['", "/");
    UrlEnd = UrlEnd.replaceAll("'\\]", "");
    UrlEnd = UrlEnd.replace("Data", "");

    var URLPrefix = 'https://test-c6f20.firebaseio.com/Reports/Report_1';
    var URL = URLPrefix+UrlEnd+'.json'
    // alert(JSON.stringify(URL, null, 2));

    axios.put(URL, [])
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
    this.Read();



  }

  render() {

    return (
      <div>
        <div>
          {this.state.loading == "loading" ?
            <div style={{fontSize: "100px", textAlign: "center"}}>
              ⌛
            </div>
            : this.state.loading == "failed" ?
            <div style={{fontSize: "100px", textAlign: "center"}}>
              ⚠
            </div>
            :
            <div>
            </div>
          }
        </div>

          <div>
            <form >

              <input type="hidden" name="_token" defaultValue="npSVkUIOsNL20SlLcSZeGJGBnmGSGE13wJMvXhqb" ></input>
              <input className="kv-di-no" type="text" name="form" defaultValue="data"></input>
              <br></br>
              <h2>JS Data</h2>
              <DataHelper
                identifier="Data"
                Attr={this.state.Attr}
                Data={this.state.Data.content}
                Create={(event, IdentifierStart,IdentifierEnd, type) => this.Create(event, IdentifierStart,IdentifierEnd, type)}
                CreateHelperName={(IdentifierStart,IdentifierEnd,value, type) => this.CreateHelperName(IdentifierStart,IdentifierEnd,value, type)}
                UpdateHelperContents={(Identifier,value) => this.UpdateHelperContents(Identifier,value)}
                UpdateHelperName={(IdentifierStart,IdentifierEnd,value) => this.UpdateHelperName(IdentifierStart,IdentifierEnd,value)}
                Delete={(event, Identifier) => this.Delete(event, Identifier)}
                Update={(event, IdentifierStart,IdentifierEnd) => this.Update(event, IdentifierStart,IdentifierEnd)}
                />
            </form>
            Data
            <pre>{JSON.stringify(this.state.Data, null, 2) }</pre>
          </div>

      </div>
    );


  }
}

// Recursive component
const DataHelper = ({ identifier,Attr, Data, Create, CreateHelperName, UpdateHelperContents, UpdateHelperName,Delete, Update, event}) => {



  return (
    <ul className="kv-list-parent">
      {typeof Data !== 'undefined' && Object.keys(Data).map((keyName, i) => (

        <li key={identifier+"["+"'content'"+"]['"+keyName+"']"}>


          <span className="kv-item-container  kv-di-in ">
            {/* Base Casfe */}
            {Data[keyName].type == Attr[6] ?
              <span className="kv-di-in">📁</span>
              :
              <span className="kv-di-in">📃</span>
            }

            <label >
              <input className="kv-tog-on-ib-switch kv-tog-off-ib-switch" type="checkbox" name="checkbox" defaultValue="value" ></input>
              <input onBlur={(Identifier,value) => {UpdateHelperName(identifier+"["+"'content'"+"]","['"+keyName+"']",event.target.value)}} className="kv-field-container kv-name kv-tog-on-ib" type="text"  defaultValue={keyName} ></input>
              <span className="kv-name-unedit kv-name kv-tog-off-ib ">{keyName}</span>
              <span className="kv-little-button ">^</span>
            </label>



            <button onClick={(event, IdentifierStart,IdentifierEnd) => {Update(event, identifier+"["+"'content'"+"]","['"+keyName+"']")}} className="kv-little-button" type="submit" >✓</button>
            <button onClick={(event, Identifier) => {Delete(event, identifier+"["+"'content'"+"]['"+keyName+"']")}} className="kv-little-button" type="submit" >×</button>



            {Data[keyName].type == Attr[6] &&
              <label className="kv-po-re">
                <span className="kv-little-button ">+</span>
                <input className="kv-tog-on-bl-switch" type="checkbox" name="checkbox" defaultValue="value" ></input>
                <span className="kv-popover kv-tog-on-bl kv-item-container  kv-di-in" >
                  <span className="kv-di-bl" >
                    <span>📁</span>
                    <input onBlur={(Identifier,value,type) => {CreateHelperName(identifier+"["+"'content'"+"]","['"+keyName+"']",event.target.value, Attr[6])}} className="kv-field-container kv-name kv-di-in "  type="text"     ></input>
                    <button onClick={(event, IdentifierStart, IdentifierEnd, type) => {Create(event, identifier+"["+"'content'"+"]","['"+keyName+"']", Attr[6])}} type="submit" className="kv-little-button" >+</button>
                  </span>
                  <span className="kv-mar-top-3 kv-di-bl">
                    <span>📃</span>
                    <input onBlur={(Identifier,value, type) => {CreateHelperName(identifier+"["+"'content'"+"]","['"+keyName+"']",event.target.value, Attr[9])}} className="kv-field-container kv-name kv-di-in"  type="text"  ></input>
                    <button onClick={(event, IdentifierStart,IdentifierEnd, type) => {Create(event, identifier+"["+"'content'"+"]","['"+keyName+"']", Attr[9])}} type="submit" className="kv-little-button" >+</button>
                  </span>
                </span>
              </label>
            }


          </span>
          {Data[keyName].type == Attr[6] ?

            <DataHelper
              identifier= {identifier+"["+"'content'"+"]['"+keyName+"']"}
              Attr= {Attr}
              Data={Data[keyName].content}
              Create={(event, IdentifierStart,IdentifierEnd, type) => {Create(event, IdentifierStart,IdentifierEnd, type)}}
              CreateHelperName={(IdentifierStart,IdentifierEnd,value, type) => CreateHelperName(IdentifierStart,IdentifierEnd,value, type)}
              UpdateHelperContents={(Identifier,value) => {UpdateHelperContents(Identifier,value)}}
              UpdateHelperName={(IdentifierStart,IdentifierEnd,value) => {UpdateHelperName(IdentifierStart,IdentifierEnd,value)}}
              Delete={(event, Identifier) => {Delete(event, Identifier)}}
              Update={(event, IdentifierStart,IdentifierEnd) => {Update(event, IdentifierStart,IdentifierEnd)}}
              />

            :
            <ul className="kv-list-parent">
              <li>
                <div className="kv-item-container ">
                  <textarea onChange={(Identifier,value) => {UpdateHelperContents(identifier+"["+"'content'"+"]['"+keyName+"']['"+Attr[2]+"']",event.target.value)}} className="kv-field-container kv-content-container kv-di-in"  rows="8" defaultValue={Data[keyName].content}></textarea>
                </div>
              </li>
            </ul>
          }
        </li>
      ))}

    </ul>


  )
}
