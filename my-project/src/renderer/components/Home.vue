<template>
  <table class="home">
    <tr class="result"><td colspan="4"><input type="text" value="0" disabled/></td></tr>
    <tr v-for="(row,kr) in keyboard" :key="kr" class="row">
      <td v-for="(btn,kb) in row" :key="kb">
         <button :class="btn.type" :id="btn.label">
           {{btn.label}}
         </button>
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      keyboard: [[{
        type: 'memory',
        event: 'clearMemory',
        label: 'MC'
      }, {
        type: 'memory',
        event: 'addMemory',
        label: 'M+'
      }, {
        type: 'memory',
        event: 'clearMemory',
        label: 'M-'
      }, {
        type: 'action',
        event: 'clear',
        label: 'C'
      }], [{
        type: 'number',
        event: 'openBrackets',
        label: '('
      }, {
        type: 'number',
        event: 'openBrackets',
        label: ')'
      }, {
        type: 'action',
        event: 'invert',
        label: '+/-'
      }, {
        type: 'action',
        event: 'power',
        label: '^'
      }], [{
        type: 'number',
        event: 'addDigit',
        label: '7'
      }, {
        type: 'number',
        event: 'addDigit',
        label: '8'
      }, {
        type: 'number',
        event: 'addDigit',
        label: '9'
      }, {
        type: 'action',
        event: 'multiplication',
        label: '*'
      }], [{
        type: 'number',
        event: 'addDigit',
        label: '4'
      }, {
        type: 'number',
        event: 'addDigit',
        label: '5'
      }, {
        type: 'number',
        event: 'addDigit',
        label: '6'
      }, {
        type: 'action',
        event: 'divide',
        label: '/'
      }], [{
        type: 'number',
        event: 'addDigit',
        label: '1'
      }, {
        type: 'number',
        event: 'addDigit',
        label: '2'
      }, {
        type: 'number',
        event: 'addDigit',
        label: '3'
      }, {
        type: 'action',
        event: 'plus',
        label: '+'
      }], [{
        type: 'number',
        event: 'addDigit',
        label: '0'
      }, {
        type: 'number',
        event: 'addPoint',
        label: '.'
      }, {
        type: 'action',
        event: 'result',
        label: '='
      }, {
        type: 'action',
        event: 'minus',
        label: '-'
      }]]
    }
  }
}
</script>
<style scoped>
.home {
  border: 1px solid white;
  background-color: blueviolet;
  border-collapse: collapse;
  width: 90%;
  height: 90%;
  margin: auto;
}
.home tr {
  height: 30px;
}
.result td input {
  background-color: transparent;
  border: none;
  color: yellow;
  width: calc(100% - 30px);
  font-size: 25px;
  padding: 5px 15px;
  text-align: right;
}
.row td {
  width: 30%;
}
.row td button,
.result td {
  font-size: 20px;
}
.row td button {
  display: block;
  background: none;
  border: none;
  width: 100%;
  height: 100%;
  color: white;
  outline-color: white;
  font-weight: 600;
}
</style>
