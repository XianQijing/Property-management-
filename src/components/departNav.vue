<template>
    <div class="departNav">
        <!-- <h1>部门</h1>
       <el-tree :data="data5"  node-key="id" default-expand-all  @node-click="back">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <div class="aa">
          <img src=".././assets/add.png" @click="() => qq(data)" class="tianjia">
          <img src=".././assets/delet.png" class="shanchu"  @click="() => remove(node, data)"/>
        </div>
      </span>
    </el-tree>
    <el-dialog
  title="添加"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="mingcheng">
  <div class="name1">部门名称：</div>
    <el-input v-model="name"></el-input>
    </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="() => append(this.pp)">确 定</el-button>
  </span>
</el-dialog> -->

    </div>
</template>

<script>
import url from '../assets/Req.js'
let id = 1000;
  export default {
    name: 'departNav',
    data() {
      return {
        data5: [],
        dialogVisible: false,
        name:'',
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ]}
      }
    },
    mounted(){
        this.getbumen()
    },
    methods: {
      append(data) {
        const newChild = { id: id++, label: this.name, children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        if (this.name !=='') {
        data.children.push(newChild);
        this.dialogVisible = false;
        console.log(data.id)
        }else{
            
        }
        this.$ajax.get(url + '',"id="+data.id).then(res=>{
            console.log(res)
        })
      },
      back(e){
            // console.log(e);
            this.$ajax.post(url + 'company/findCompanyById',"id="+e.id).then(res =>{
                var child = res.data.data;
                // console.log(child)
                if (!e.children) {
                    this.$set(e, 'children', []);
                    }
                    console.log(this.data5)
                e.children = res.data.data
            })
            this.$ajax.post(url + 'company/findUser',"id="+e.id).then(res =>{
                })
            
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
        
        this.$ajax.post(url + 'company/delete',"id="+data.id).then(res=>{
            console.log(res)
        })
      },

      qq(data){
      this.dialogVisible = true;
      this.pp = data;
      this.name = '';
      },

      getbumen(){
          this.$ajax.get(url + 'company/findCompany').then(res => {
              var data = res.data.data
            //   console.log(res.data.data)
              this.data5= res.data.data
            //   console.log(res.data.data)
          })
      },


    //    loadNode(node, resolve) {
    //     if (node.level === 0) {
    //       return resolve(this.data5);
    //     }
    //     if (node.level > 1) return resolve([]);

    //     setTimeout(() => {
    //         const data = this.data5.children

    //       resolve(data);
    //     }, 500);
    //   }
      }
  }
</script>
<style scoped>


.departNav h1 {
    padding-left: 2%;
    font-size: 1.5vw;
}

li {
    height: 51px;
	list-style-type: none;
	color: black;
	width: 100%;
	text-align: center;
    background-color: white;
    padding-right: 50px;
}
.tianjia{
    width: 20px;
    position: relative;
    left: 8px;
}
.shanchu {
    width: 35px;
}
.name1 {
    margin-left: 2%;
    display: inline-block;
}
.el-input{
    display: inline-block;
    width: 70%;
}
.mingchen {
    width: 50%;
}
.aa{
    display: inline-block;
}
</style>

