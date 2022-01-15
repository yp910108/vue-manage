import Icon from './icon'
import Table from './table'
import Pagination from './pagination'
import Input from './input'
import Select from './select'
import TreeSelect from './tree-select'
import TreeCheckBox from './tree-checkbox'
import Cascader from './cascader'
import DatePicker from './date-picker'
import Upload from './upload'

export default function (Vue) {
  Vue.component(Icon.name, Icon)
  Vue.component(Table.name, Table)
  Vue.component(Pagination.name, Pagination)
  Vue.component(Input.name, Input)
  Vue.component(Select.name, Select)
  Vue.component(TreeSelect.name, TreeSelect)
  Vue.component(TreeCheckBox.name, TreeCheckBox)
  Vue.component(Cascader.name, Cascader)
  Vue.component(DatePicker.name, DatePicker)
  Vue.component(Upload.name, Upload)
}
