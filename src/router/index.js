import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Department from '@/components/department'
import House from '@/views/house'
import Next from '@/views/next'
import Login from '@/views/login'
import Daoru from '@/views/daoru'
import AddBuild from '@/views/addBuild'
import AddCar from '@/views/addCar'
import CarCharge from '@/views/carCharge'
import Relationship from '@/views/relationship'
import RelationshipAdd from '@/views/relationshipAdd'
import Rent from '@/views/rent'
import RentAddhouse from '@/views/rent_addhouse'
import RentContractChange from '@/views/rent_contract_change'
import Charge from '@/views/charge'
import Support from '@/views/support'
import Apply from '@/views/apply'
import Check from '@/views/check'
import Patrol from '@/views/patrol'
import Server1 from '@/views/server'
import Return from '@/views/return'
import Test from '@/views/test'
import AddCustomer from '@/views/addCustomer'
import AddAdmin from '@/views/addAdmin'
import Notice from '@/views/notice'

Vue.use(Router)

export default new Router({
  // 个人首页
  routes: [
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: 'notice',
          name: 'Notice',
          component: Notice
        }
      ]
    //   meta: {
    //     requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    // },
    },
    // 客户关系
    {
      path: '/relationship',
      name: 'Relationship',
      component: Relationship,
      children: [
        {
          path: 'relationshipAdd',
          name: 'RelationshipAdd',
          component: RelationshipAdd
        },
        {
          path: 'apply',
          name: 'Apply',
          component: Apply
        },
        {
          path: 'check',
          name: 'Check',
          component: Check
        },
        {
          path: 'patrol',
          name: 'Patrol',
          component: Patrol
        },
        {
          path: 'server',
          name: 'Server1',
          component: Server1
        },
        {
          path: 'return',
          name: 'Return',
          component: Return
        },
        {
          path: 'addCustomer',
          name: 'AddCustomer',
          component: AddCustomer
        }
      ]
    },
    // 登录
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    // 基础管理
    {
      path: '/department',
      name: 'Department',
      component: Department
    },
    // 房产管理
    {
      path: '/house',
      name: 'House',
      component: House,
      children: [
        {// 房间的添加
          path: 'next',
          name: 'Next',
          component: Next
        },
        {// 管理区的添加
          path: 'addAdmin',
          name: 'AddAdmin',
          component: AddAdmin
        },
        {// 房间的导入
          path: 'daoru',
          name: 'Daoru',
          component: Daoru
        },
        {// 楼宇的导入
          path: 'addBuild',
          name: 'AddBuild',
          component: AddBuild
        },
        {// 车辆的增加
          path: 'addCar',
          name: 'AddCar',
          component: AddCar
        },
        {// 车辆的收费标准
          path: 'carCharge',
          name: 'CarCharge',
          component: CarCharge
        },
        {
          path: 'test',
          name: 'Test',
          component: Test
        }
      ]
    },
    {// 租赁管理
      path: '/rent',
      name: 'Rent',
      component: Rent,
      children: [
        {
          path: 'rent_addhouse',
          name: 'Rent_addhouse',
          component: RentAddhouse
        },
        {
          path: 'Rent_contract_change',
          name: 'Rent_contract_change',
          component: RentContractChange
        }
      ]
    },
    // 收费管理
    {
      path: '/charge',
      name: 'Charge',
      component: Charge
    },
    {
      path: '/support',
      name: 'Support',
      component: Support
    }
  ]
})
