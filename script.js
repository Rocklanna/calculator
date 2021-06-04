const { applyMiddleware, createStore, combineReducers, bindActionCreators } = Redux;
const { Provider, connect } = ReactRedux;

const symbol = {
  divide: ' / ',
  multiply: ' x ',
  substract: / - /,
  add: / + / };


//Redux

const stat = 'newStatus';
const defaultState = {
  summation: '' };


const creator = sumPassed => {
  return {
    type: code,
    changeStatus: sumPassed };

};

const reducer = (defaultState, action) => {
  switch (action.type) {
    case 'newStatus':
      return {
        summation: action.changeStatus };

    default:
      return defaultState;}

};

const store = Redux.createStore(reducer);


//React

class Calculate extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      summation: '',
      total: 0,
      computeValues: [] };

    this.showValue = this.showValue.bind(this);
  } // end of constructor

  componentDidMount()
  {
    this.state = {
      summation: '',
      total: 0,
      computeValues: [] };

  } // end of componentDidMount

  showValue(event)
  {
    var clickedOn = event.target.value;
    var newValues = this.state.summation.concat(clickedOn);
    var lastEntered = newValues.charAt(newValues.length - 2);
    var total = clickedOn;
    const Regex = /[0-9]/;
    const regextypeNum = /[0-9]{2,}/;
    const tester = /\D/;
    const spiltRegex = /(?=[+\-/\*=])|(?<=[+\-/\*=])/;
    const regexOperand = /[+\-/\*]/;
    const regexZeros = /^[0]\d+/;
    const checkDecimal = /\d*[.]\d*/;
    const regexDeci = /\d*[\.]\d*[\.]+/;
    const twoRegexOperator = /[+/\*]{2}/;
    const threeRegexOperator = /[+/\-\*]{3}/;
    const regexMinus = /[+\*\/][\-]\d$/;

    if (clickedOn === 'AC') {
      this.setState({
        summation: '',
        total: 0,
        computeValues: [] });

    } //end of  clickedON AC if
    else if (clickedOn === '=') {

        var totalHolder = this.state.computeValues;
        // alert(totalHolder);
        totalHolder = totalHolder.map(item => {
          return Regex.test(item) ? parseFloat(item) : item;
        });
        const index = 1;
        const numtotal = totalHolder.reduce((sum, item, index) => {

          return item === '+' ? sum + totalHolder[index + 1] :
          item === '-' ? sum - totalHolder[index + 1] :
          item === '/' ? parseFloat((sum / totalHolder[index + 1]).toFixed(4)) :
          item === '*' ? sum * totalHolder[index + 1] :
          sum + 0;
        }, totalHolder[0]);

        this.setState({
          summation: newValues,
          total: numtotal,
          computeValues: [] });

      } // end of clickedON Equals else if
      else
        {// else Big Outer

          if (lastEntered === "=") {

            if (regexOperand.test(clickedOn))
            {
              var firstValue = this.state.total;
              this.state.summation = firstValue;
              newValues = firstValue + clickedOn;
              this.state.computeValues.push(firstValue);
              this.state.total = 0;

            } // end of lastEntered inner if
            else
              {
                newValues = clickedOn;
                this.state.computeValues = [];
                this.state.total = 0;
              } // end of inner else

          } // end of outer else
          var newArray = newValues.split(spiltRegex);

          if (Regex.test(clickedOn))
          {
            clickedOn = parseFloat(clickedOn);
          } // end of Regex if


          var computeHolder = [...this.state.computeValues];

          if (typeof computeHolder[computeHolder.length - 1] === 'number' && typeof clickedOn === 'number' && computeHolder.length !== 0 || Regex.test(computeHolder[computeHolder.length - 1]) && clickedOn === '.' || checkDecimal.test(computeHolder[computeHolder.length - 1]) && typeof clickedOn === 'number')
          {

            var lastElement = "" + computeHolder[computeHolder.length - 1] + clickedOn;
            computeHolder.splice(computeHolder.length - 1, 1, lastElement);
          } // end of typeof computeHolder if
          else
            {

              computeHolder.push(clickedOn);

            } // end of else



          var arrayLength = newArray.length;
          var newLength = computeHolder.length;
          var stringLength = newValues.length;
          const confirmedValues = '';

          if (regexZeros.test(newArray[newLength - 1])) {

            newValues = newValues.slice(0, stringLength - 2) + newValues.slice(stringLength - 1);
            computeHolder = computeHolder.map(item => {
              return Regex.test(item) ? parseFloat(item) : item;
            });
          } // end of regexZeros if

          if (regexDeci.test(newArray[newLength - 1])) {
            // alert("Deci");
            newValues = newValues.slice(0, stringLength - 1);
            var lastValue = computeHolder[computeHolder.length - 1];

            lastValue = lastValue.slice(0, lastValue.length - 1);

            computeHolder.splice(computeHolder.length - 1, 1, lastValue);
            clickedOn = newValues.slice(-1);
          } // end of regexDeci if 

          if (twoRegexOperator.test(newValues)) {

            newValues = newValues.slice(0, stringLength - 2) + newValues.slice(stringLength - 1);


            computeHolder.splice(newLength - 2, 1);
            newLength = computeHolder.length;
          } // end of twoRegexOperator if 

          if (threeRegexOperator.test(newValues)) {
            newValues = newValues.slice(0, stringLength - 3) + newValues.slice(stringLength - 1);


            computeHolder.splice(newLength - 3, 2);
            newLength = computeHolder.length;
          } // end of threeRegexOperator if 

          if (regexMinus.test(newValues)) {

            var replace = computeHolder.slice(newLength - 2).join("");

            computeHolder.splice(newLength - 2, 2, replace);
            newLength = computeHolder.length;
          } // end of regexMinus if 


          clickedOn = computeHolder[computeHolder.length - 1];
          computeHolder = computeHolder.map(item => {
            return checkDecimal.test(item) ? item :
            Regex.test(item) ? parseFloat(item) :
            item;
          });

          this.setState({
            summation: newValues,
            total: clickedOn,
            computeValues: computeHolder });


        } // end of else Big Outer
  } // end of function

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "mainBody" }, /*#__PURE__*/
      React.createElement("div", { id: "calcu" }, /*#__PURE__*/
      React.createElement("div", { id: "screen" }, /*#__PURE__*/
      React.createElement("input", { id: "summation", value: this.state.summation, disabled: true }), /*#__PURE__*/
      React.createElement("input", { id: "display", value: this.state.total, disabled: true })), /*#__PURE__*/

      React.createElement("div", { className: "mainContainer" }, /*#__PURE__*/
      React.createElement("div", { className: "threeCols" }, /*#__PURE__*/
      React.createElement("button", { id: "clear", onClick: this.showValue, value: "AC" }, "AC"), /*#__PURE__*/
      React.createElement("button", { id: "divide", onClick: this.showValue, value: "/" }, "/"), /*#__PURE__*/
      React.createElement("button", { id: "multiply", onClick: this.showValue, value: "*" }, "x")), /*#__PURE__*/

      React.createElement("div", { className: "fourCols" }, /*#__PURE__*/
      React.createElement("button", { id: "seven", onClick: this.showValue, value: "7" }, "7"), /*#__PURE__*/
      React.createElement("button", { id: "eight", onClick: this.showValue, value: "8" }, "8"), /*#__PURE__*/
      React.createElement("button", { id: "nine", onClick: this.showValue, value: "9" }, "9"), /*#__PURE__*/
      React.createElement("button", { id: "subtract", onClick: this.showValue, value: "-" }, "-")), /*#__PURE__*/

      React.createElement("div", { className: "fourCols" }, /*#__PURE__*/
      React.createElement("button", { id: "four", onClick: this.showValue, value: "4" }, "4"), /*#__PURE__*/
      React.createElement("button", { id: "five", onClick: this.showValue, value: "5" }, "5"), /*#__PURE__*/
      React.createElement("button", { id: "six", onClick: this.showValue, value: "6" }, "6"), /*#__PURE__*/
      React.createElement("button", { id: "add", onClick: this.showValue, value: "+" }, "+")), /*#__PURE__*/

      React.createElement("div", { className: "twoCols" }, /*#__PURE__*/
      React.createElement("div", { className: "firstCol" }, /*#__PURE__*/
      React.createElement("div", { className: "firstLastCol" }, /*#__PURE__*/
      React.createElement("button", { id: "one", onClick: this.showValue, value: "1" }, "1"), /*#__PURE__*/
      React.createElement("button", { id: "two", onClick: this.showValue, value: "2" }, "2"), /*#__PURE__*/
      React.createElement("button", { id: "three", onClick: this.showValue, value: "3" }, "3")), /*#__PURE__*/

      React.createElement("div", { className: "secondLastCol" }, /*#__PURE__*/
      React.createElement("button", { id: "zero", onClick: this.showValue, value: "0" }, "0"), /*#__PURE__*/
      React.createElement("button", { id: "decimal", onClick: this.showValue, value: "." }, "."))), /*#__PURE__*/


      React.createElement("div", { className: "secondCol" }, /*#__PURE__*/
      React.createElement("button", { id: "equals", onClick: this.showValue, value: "=" }, "=")))))));






    // return
  } //end of render
}
//ReactRedux

const mapStateToProps = state => {
  return {
    theState: state };

};

const mapDispatchToProps = dispatch => {
  return {
    submitMessage: message => {
      dispatch(creator(message));
    } };

};

const Container = connect(mapStateToProps, mapDispatchToProps)(Calculate);


class CalculateWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement(Provider, { store: store }, /*#__PURE__*/
      React.createElement(Container, null)));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(CalculateWrapper, null), document.getElementById('calculator'));