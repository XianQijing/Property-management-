<template>
    <div class="manage">
        <el-container>
            <el-aside width="200px">
        <depart-nav/>
            </el-aside>
            <el-main>
        <div class="body">
            <div class="title">
                <h3>人员</h3><span>共5条记录</span>
                </div>
                    <el-table :data="tableData2" style="width: 100%">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
                        <el-table-column prop="name2" label="姓名" width="180"></el-table-column>
                        <el-table-column prop="position2" label="所属部门"></el-table-column>
                        <el-table-column prop="post2" label="岗位"></el-table-column>
                        <el-table-column prop="role" label="角色"></el-table-column>
                        <el-table-column prop="file" label="个人文档"></el-table-column>
                        <el-table-column label="停用">
                            <template  slot-scope="scope">
                            <button class="stop">停用</button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import departNav from './departNav'
export default {
    name: 'manage',
    data(){
        return{
            tableData2: [
                {
                    userName: 'admin',
                    name2: '系统管理员',
                    position2: '所有部门',
                    post2: '部门经理',
                    role: '系统管理员',
                    file: '2048M',
                },
                {
                    userName: 'admin',
                    name2: '系统管理员',
                    position2: '所有部门',
                    post2: '部门经理',
                    role: '系统管理员',
                    file: '2048M',
                },
                {
                    userName: 'admin',
                    name2: '系统管理员',
                    position2: '所有部门',
                    post2: '部门经理',
                    role: '系统管理员',
                    file: '2048M',
                },
                {
                    userName: 'admin',
                    name2: '系统管理员',
                    position2: '所有部门',
                    post2: '部门经理',
                    role: '系统管理员',
                    file: '2048M',
                },
                {
                    userName: 'admin',
                    name2: '系统管理员',
                    position2: '所有部门',
                    post2: '部门经理',
                    role: '系统管理员',
                    file: '2048M',
                },
            ]
        }
    },
    components: {
    departNav
  }
}
</script>

<style scoped>

h3{
    display: inline-block;
    margin: 1% 16px;
}
.biaodan span{
    width: 12%;
    text-align: center;
    display: inline-block;
    padding: 16px 0;
    font-size: 12px;
    font-family: "Microsoft YaHei";
}
.name {
  font-size: 12px;
  font-family: "Microsoft YaHei";
  color: rgb(111, 192, 85);
  line-height: 2.667;
}
.head{
  background-color: rgb(250, 250, 250);
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
}
button {
  border:1px solid rgb(46, 146, 255);
  border-radius: 5px;
  background: white;
  width: 58px;
  height: 30px;
}
label {
        width: 100%;
}
</style>
