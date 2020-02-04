
import Vue from 'vue'
import {
  Button,
  Container,
  Header,
  Main,
  Col,
  Row,
  Input,
  Icon,
  Table,
  TableColumn,
  Avatar,
  Dialog,
  Form,
  FormItem,
  Message,
  MessageBox,
  Notification,
  Tooltip
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/display.css'

const components = [
  Container,
  Header,
  Button,
  Main,
  Col,
  Row,
  Input,
  Icon,
  Table,
  TableColumn,
  Avatar,
  Dialog,
  Form,
  FormItem,
  Tooltip
]

function install (Vue, opts = {}) {
  locale.use(lang)

  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification

Vue.use({ install }, { size: 'medium' })
