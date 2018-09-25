<template>
  <div class="parameters">
    <button class="add"  @click="addDuanxin(1)">添加</button>
    <button class="add"  @click="addDuanxin(2)">发送</button>
    <el-table :data="template" style="width: 100%">
      <el-table-column prop="titleName" label="标题" width="350"></el-table-column>
      <el-table-column prop="content" label="内容" width="400"></el-table-column>
      <el-table-column prop="signature" label="签名" width="350"></el-table-column>
      <el-table-column width="201">
        <template slot-scope="scope" v-if="scope.row.titleName!='费用通知'&&scope.row.titleName!='欠费通知'">
          <button class="operation" @click="noteTemplateEdit(scope.$index,template)">编辑</button>
          <button class="operation" @click="noteTemplateDelete(scope.$index, template)">删除</button>
        </template>
      </el-table-column>
      <el-table-column></el-table-column>
    </el-table>
    <div class="fenye">
      <el-pagination @size-change="handleSizeChangetemplate" @current-change="handleCurrentChangetemplate" :current-page="pageNoTemplate"  :page-size="pageSizeTemplate" :page-sizes="pageSizesListTemplate" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumbertemplate">
      </el-pagination>
    </div>
    <el-dialog :title="this.name"	:visible.sync="modify" width="30%">
      <el-form :model="addMessage" :rules="rules" ref="addMessage" label-width="100px" class="demo-addMessage" v-if="msg === 1" style="width:90%">
        <el-form-item label="短信标题:" prop="title">
          <el-select v-model="addMessage.title" placeholder="请输入短信标题" style="width:100%">
            <el-option
              v-for="item in messageTitle"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span class="tixing">仅为表示，短信不发送标题</span>
        </el-form-item>
          <el-form-item label="短信内容:" prop="content">
              <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="addMessage.content"
                  maxlength=17
                  resize="none">
              </el-input>
              <span class="tips">{{tips}}/17</span>
          </el-form-item>
            <el-form-item label="签名:" prop="sign">
              <el-input v-model="addMessage.sign"></el-input>
            </el-form-item>
      </el-form>
          <!-- 群发短信 -->
      <el-form :model="textMessage" ref="textMessage" label-width="100px" class="demo-textMessage" v-if="msg === 2">
        <el-form-item label="短信模板:">
          <el-select v-model="textMessage.templateId" placeholder="请选择短信模板">
            <el-tooltip placement="right" v-for="items in templates" :key="items.id" effect="light">
              <div slot="content">{{items.content}}</div>
              <el-option
                :label="items.titleName"
                :value="items.id">
              </el-option>
            </el-tooltip>
          </el-select>
        </el-form-item>
        <el-form-item label="发送类型:">
          <el-radio v-model="textMessage.change" label="1" @change="tt">指定身份发送</el-radio>
          <el-radio v-model="textMessage.change" label="2" @change="tt">指定号码发送</el-radio>
        </el-form-item>
        <el-form-item label="发送对象:" v-if="textMessage.change === '1'">
            <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="textMessage.more"
              @change="changeOne">
            </el-cascader>
        </el-form-item>
        <!-- <el-form-item label="住户状态:" v-if="textMessage.change === '1'">
          <el-radio v-model="textMessage.status" label="1">已迁入</el-radio>
          <el-radio v-model="textMessage.status" label="2">已迁出</el-radio>
        </el-form-item> -->
        <el-form-item label="发送对象:" v-if="textMessage.change === '2'">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入号码，多条以逗号(半角)隔开"
            v-model="textMessage.who">
          </el-input>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer" v-show="tianjia">
          <el-button @click="modify = false">取 消</el-button>
          <el-button type="primary" @click="addOne()">确 定</el-button>
        </span>
        <span slot="footer" class="dialog-footer" v-show="bianji">
          <el-button @click="modify = false">取 消</el-button>
          <el-button type="primary" @click="noteTemplateUpdate">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import url from '../../assets/Req.js'
export default {
  name: 'parameters',
  data(){
    return{
      tips: 0,
      template:[],
      msg: 0,
      textMessage: {
        templateId: '',
        change: '1',
        who: '',
        textarea: '',
        more:[]
      },
      addMessage: {
        content:'',
        title: 32,
        sign: 'a'
      },
      modify:false,
      tianjia:false,
      bianji:true,
      name:'添加短信模板',
      totalDataNumbertemplate: 0,
      pageNoTemplate: 1,
      pageSizeTemplate: 10,
      pageSizesListTemplate: [10,20, 30, 40, 50],
      rules: {
        title: [
          { required: true, message: '请输入短信标题', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入短信内容', trigger: 'blur' },
          { max: 246, message: '长度在246个字符以内', trigger: 'blur' }
        ],
        sign:[
          { required: true, message:'请输入签名',trigger: 'blur'}
        ]
      },
      messageTitle:[
        {label: "节日祝福",value: 32},
        {label: "生日祝福",value: 33},
        {label: "活动通知",value: 34},
        {label: "短信调查",value: 37}
      ],
      options: [],
      templates: []
    }
  },
  mounted(){
    this.gettemplate()
    this.moreSelect()
  },
  watch: {
    'addMessage.content': function (val) {
      if (val){
        this.tips = val.length
      }
    }
  },
  methods:{
    tt(){
      this.textMessage.who = ''
    },
    changeOne(e){
      this.textMessage.who = e.join(",")
    },
    moreSelect(){
      this.$ajax.get(url + 'room/flndByBuilding/aaa').then(res => {
        this.options = res.data
      })
    },
    addDuanxin(msg){
      this.msg = msg
      this.modify = true
      this.tianjia = true,
      this.bianji = false
      if(msg === 1){
        this.addMessage = {},
        this.name = '添加短信模板'
        this.addMessage = {}
      }else{
        this.getTemplate()
        this.textMessage.title = '',
        this.textMessage.textarea = ''
        this.name = '短信群发'
        this.textMessage.who=''
        this.textMessage.change = '1'
      }
    },
    noteTemplateEdit(index,rows){
      let that = this;
      this.msg = 1
      that.id = this.template[index].id;
      this.modify = true,
      this.bianji = true,
      this.tianjia = false
      if(that.id){
        this.name = '编辑短信模板'
        this.$ajax.get(url+'noteTemplate/findId/' + this.id).then(res => {
          if(res.status === 200){
          this.addMessage.title = birthDay(res.data.title);
          this.addMessage.content = res.data.content;
          this.addMessage.sign = res.data.signature;
          }else if(res.data.status===403){
            this.$message({
              message:'权限不足',
              type: 'error'
            })
          }
        })
      }
    },
    noteTemplateDelete(index,rows) {
      let that = this;
      that.id = this.template[index].id;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
        this.$ajax.delete(url+'noteTemplate/del/' + this.id).then((res) => {
          if(res.status === 200){
            this.gettemplate()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }else if(res.data.status===403){
            this.$message({
              message:'权限不足',
              type: 'error'
            })
          }else{
            this.$message(
              {
                type: 'error',
                message: this.msg
              }
            )
          }
        })
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        }
      ); 
    },
    handleSizeChangetemplate(val) {
      this.pageSizeTemplate = val;
      this.gettemplate()
    },
    handleCurrentChangetemplate(val) {
      this.pageNoTemplate = val;
      this.gettemplate()
    },
    gettemplate() {
      this.$ajax.get(url+'noteTemplate/findCondition/'+this.pageNoTemplate+'/'+this.pageSizeTemplate).then((res) => {
        if(res.status===200){
          this.template = res.data.data.rows
          this.totalDataNumbertemplate = res.data.data.records
        }else if(res.data.status===403){
                this.$alert('您的权限不足', '权限不足', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.news = false
                  }
                });
              }
      })
    },
    getTemplate() {
      this.$ajax.get(url+'noteTemplate/findByExcept/'+this.pageNoTemplate+'/'+this.pageSizeTemplate).then((res) => {
        if(res.status===200){
          this.templates = res.data.data.rows
          this.totalDataNumbertemplate = res.data.data.records
        }else if(res.data.status===403){
                this.$alert('您的权限不足', '权限不足', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.news = false
                  }
                });
              }
      })
    },
    addOne(){
      if(this.msg === 1){
        var noteTemplate={};
        noteTemplate.title=this.addMessage.title;
        noteTemplate.content=this.addMessage.content;
        noteTemplate.signature=this.addMessage.sign;
        this.$ajax.post(url+"noteTemplate/insert",noteTemplate
        ).then((res) => {
          if(res.data.status===200){
          this.form = res.data
          this.$message({
            message: '添加成功',
            type: 'success'
        });
          this.modify = false
          this.gettemplate()
          }else if(res.data.status===403){
            this.$message({
              message:'权限不足',
              type: 'error'
            })
          }else{
            this.$message({
            message: '添加失败',
            type: 'error'
          });
          }
        })
      }else{
        if (!this.textMessage.templateId){
          this.$message.error('请选择标题');
        }else if(!this.textMessage.change){
          this.$message.error('请选择发送类型');
        }else if(!this.textMessage.who){
          this.$message.error('请选择发送对象');
        }else{
          this.$ajax.post(url + 'note/insert/'+this.textMessage.templateId+'/'+this.textMessage.change+'/'+this.textMessage.who).then(res => {
            if(res.data.status === 200){
              this.$message({
                  message: '成功',
                  type: 'success'
              });
              this.modify = false
            }else if(res.data.status===403){
            this.$message({
              message:'权限不足',
              type: 'error'
            })
          }else{
              this.$message({
                  message: res.data.msg,
                  type: 'error'
              });
            }
          })
        }
      }
    },
    noteTemplateUpdate(){
			this.bianji == true,
			this.tianjia == false
			var noteTemplate={};
			noteTemplate.id=this.id;
      noteTemplate.title=birthDay1(this.addMessage.title);
      noteTemplate.content=this.addMessage.content;
      noteTemplate.signature=this.addMessage.sign;
			this.$ajax.put(url+'noteTemplate/update',noteTemplate).then(res => {
				if(res.status === 200){
					this.$message({
            message: '成功',
            type: 'success'
          });
          this.modify = false
          this.gettemplate()
				}else if(res.data.status===403){
            this.$message({
              message:'权限不足',
              type: 'error'
            })
          }else{
					this.$message({
            message: '失败',
            type: 'error'
          });
				}
			})
		}
  }
}
function birthDay (data) {
  if (data === '32') return '节日祝福'
  if (data === '33') return '生日祝福'
  if (data === '34') return '活动通知'
  if (data === '35') return '欠费通知'
  if (data === '36') return '费用通知'
  if (data === '37') return '短信调查'
}
function birthDay1 (data) {
  if (data === '节日祝福') return '32'
  if (data === '生日祝福') return '33'
  if (data === '活动通知') return '34'
  if (data === '欠费通知') return '35'
  if (data === '费用通知') return '36'
  if (data === '短信调查') return '37'
}
</script>

<style scoped>
.parameters{
  background: white;
  width: 100%;
  margin: 0;
  position: static;
  padding: 0 40px 0 50px;
  width: 99%;
  margin-left: 2px;
  height: 810px;
}
.fenye {
  float: right;
  padding: 20px 0;
}
.add {
  color: white;
  background-color: #32a8ee;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  border: 1px solid #32a8ee;
  border-radius: 5px;
  width: 64px;
  height: 31px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.operation{
	width: 64px;
	height: 32px;
	border-radius: 5px;
	border: 1px solid #A1CEFF;
	background: white;
	color: #A1CEFF;
}
.tixing {
  font-size: 11px;
  color: red
}
.tips {
  position: absolute;
  top: 20px;
  right: 14px;
  color: #909399;
}
</style>

