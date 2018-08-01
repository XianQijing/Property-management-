<template>
    <div class="item">
      <li>
    <div :class="{bold: isFolder}" @click="toggle" @dblclick="changeType">
        <span>{{ model.name }}
        </span>
            <span @click="dialogVisible = true">添加</span>
          
    </div>

      <ul v-show="open" v-if="isFolder">
      <div
        class="item"
        v-for="(model, index) in model.children"
        :key="index"
        :model="model">
      </div>
      
    </ul>
  </li>

  <!-- //添加弹窗 -->
  <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="30%">
      <el-input v-model="name" placeholder="请输入部门"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addChild">确 定</el-button>
      </span>
</el-dialog>
    </div>
</template>

<script>
let id = 0;
export default {
    name:'item',
    props: {
    model: Object
  },
  data: function () {
    return {
      dialogVisible:false,
      open: false,
      name:''
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    // changeType: function () {
    //   if (!this.isFolder) {
    //     Vue.set(this.model, 'children', [])
    //     this.addChild()
    //     this.open = true
    //   }
    // },
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild() {
      this.model.children.push({
        id: id++,
        name: this.name,
        children:[],
        class:'pp zhu'
      })
      console.log(this.model)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
li {
  list-style-type:none;
}

.item{
    display: inline-block;
    width: 15.7%;
    position: relative;
    bottom: 0;
    left: 5px;
    background-color: white;
    height: 836px;;
}
 h1 {
    padding-left: 2%;
    font-size: 20px;
}
li {
      height: 51px;
      list-style-type: none;
      color: black;
      width: 100%;
      text-align: center;
      background-color: white;
      display: block;
  }
ul {
  padding: 0;
  width: 100%;
}
</style>
