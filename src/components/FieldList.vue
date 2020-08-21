<template>
  <div class="container-fluid" id='fieldList'>
    <!-- <button type="button" class="btn btn-success">Success</button> -->
    <H3>場域列表</H3>
    <table class="table">
      <thead class='thead-dark'>
        <tr>
          <!-- <th>
            <input type="checkbox" id="check_all">
          </th> -->
          <th>場域ID</th>
          <th>場域名稱</th>
          <th>Path Loss Model</th>
          <!-- <th>加入最愛</th> -->
          <th>基地台數量</th>
          <th>連線人數</th>
          <th>告警訊息</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in fieldList" :key="key">
          <td><router-link :to="{name:'Field', params: { id: item.fieldId}}">{{item.fieldId}}</router-link></td>
          <!-- <td><router-link to='/field:id'>{{item.fieldName}}</router-link></td> -->
          <td><router-link :to="{name:'Field', params: { id: item.fieldId}}">{{item.fieldName}}</router-link></td>
          <td>{{item.pathLossModel}}</td>
          <td>{{item.enbCount}}</td>
          <td>{{item.ueCount}}</td>
          <td>{{item.fmCounterCount}}</td>
          <!-- <td>{{item}}</td> -->
        </tr>
      </tbody>
      <tfoot>
        <tr class='table-primary'>
          <td colspan="8">
            <!-- <span id="delete_field_btn" class="glyphicon glyphicon-trash pull-left" onclick="deleteFields()"></span> -->
            <span>全部共有</span> <span>{{fieldList.length}}個場域</span>
            <span class="pull-right pageselect" id="fl_field_list_page_btns">
              <!-- <a href="#" ><span class="glyphicon glyphicon-step-backward"></span></a>
              <a href="#" ><span class="glyphicon glyphicon-chevron-left"></span></a>
              <a href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#" ><span class="glyphicon glyphicon-chevron-right"></span></a>
              <a href="#" ><span class="glyphicon glyphicon-step-forward"></span></a> -->
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'FieldList',
      fieldList: []
    }
  },
  mounted () {
    this.$http.get('http://211.20.94.206:5888/son/oam/sonAllFieldInfo?method=fieldid_asc&from=1&to=')
      .then(rsp => {
        let fieldList = rsp.body.fieldList
        console.log(fieldList)
        fieldList.forEach(el => {
          this.fieldList.push(el)
        })
      })
  },
  methods: {
  }
}
</script>

<style scoped>

#fieldList {
  margin: 10px;
}

</style>
