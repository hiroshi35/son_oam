<template>
  <!-- <div>
    {{msg}}
  </div> -->
  <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content modalEditFieldContent">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{fieldInfo.fieldName}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class='row'>
            <div class="col-md-12">
              <table class="input_tabele">
                <tr>
                  <td>場域名稱</td>
                  <td><input type="text" name="" id="mdaef_field_name" maxlength="256" v-model="fieldName"></td>
                  <td>場域型態</td>
                  <td>
                    <label><input type="radio" name="mdaef_field_type" value="LTE" v-model="fieldType">LTE</label>
                    <label><input type="radio" name="mdaef_field_type" value="LAA" v-model="fieldType">LAA</label>
                    <label><input type="radio" name="mdaef_field_type" value="LWA" v-model="fieldType">LWA</label>
                    <label><input type="radio" name="mdaef_field_type" value="MIMO" v-model="fieldType">Network MIMO</label>
                  </td>
                </tr>
                <tr>
                  <td>無線通道模型</td>
                  <td>
                    <select id="mdaef_path_loss_model" v-model="selected">
                      <option value ="4">開放空間(Free Space)</option>
                      <option value ="1">集會廣場(Urban Macro LOS)</option>
                      <option value ="2">市區街道(Urban Macro NLOS)</option>
                      <option value ="0">室內大廳(Indoor Hotspot LOS)</option>
                      <option value ="3">室內樓層(Indoor Hotspot NLOS)</option>
                    </select>
                  </td>
                  <td>自製地圖上傳</td>
                  <td>
                  <label>上傳格式為 .png 檔</label><br>
                  <input type="file" id="mdaef_map_img" name="map_img" accept="image/png">
                  <!-- <span class="bg-danger" id="mdaef_map_upload_err_msg"><img src="">地圖上傳失敗</span>
                  <span class="bg-success_noi" id="mdaef_map_upload_suc_msg"><img src="">地圖上傳成功</span> -->
                  </td>
                </tr>
                <tr>
                  <td>場域北界</td>
                  <td><input type="text" id="mdaef_north" maxlength="12" v-model="north">
                    <p class="note">輸入緯度資料 -90.0 ~ 90.0</p>
                  </td>
                  <td>地圖北界</td>
                  <td><input type="text" id="mdaef_north_map" maxlength="12" :value="0">
                    <p class="note">輸入緯度資料 -90.0 ~ 90.0</p>
                  </td>
                </tr>
                <tr>
                  <td>場域南界</td>
                  <td><input type="text" id="mdaef_south" maxlength="12" v-model="south">
                    <p class="note">輸入緯度資料 -90.0 ~ 90.0</p>
                  </td>
                  <td>地圖南界</td>
                  <td><input type="text" id="mdaef_south_map" maxlength="12" :value="0">
                    <p class="note">輸入緯度資料 -90.0 ~ 90.0</p>
                  </td>
                </tr>
                <tr>
                  <td>場域東界</td>
                  <td><input type="text" id="mdaef_east" maxlength="12" v-model="east">
                    <p class="note">輸入經度資料 -180.0 ~ 180.0</p>
                  </td>
                  <td>地圖東界</td>
                  <td><input type="text" id="mdaef_east_map" maxlength="12" :value="0">
                    <p class="note">輸入經度資料 -180.0 ~ 180.0</p>
                  </td>
                </tr>
                <tr>
                  <td>場域西界</td>
                  <td><input type="text" id="mdaef_west" maxlength="12" v-model="west">
                    <p class="note">輸入經度資料 -180.0 ~ 180.0</p>
                  </td>
                  <td>地圖西界</td>
                  <td><input type="text" id="mdaef_west_map" maxlength="12" :value="0">
                    <p class="note">輸入經度資料 -180.0 ~ 180.0</p>
                  </td>
                </tr>
                <!-- <tr>
                <td >OAM GPS</td>
                <td>
                  <label><input type="radio" name="mdaef_enable_oam_gps" value="1">允許</label>
                  <label><input type="radio" name="mdaef_enable_oam_gps" value="0">不允許</label>
                </td>
                <td class="newenb">基地台新增</td>
                <td class="newenb">
                  <div>Excel批次上傳(.xlsx / .xls / .csv)</div><input type="file" id="mdaef_batch_add_devices_excel" accept=".xlsx,.xls,.csv">
                  <a href="" class="download_img"><img src="">範本下載</a>
                </td>
                </tr> -->
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
          <button type="button" class="btn btn-primary" @click="editFieldParam()">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'fieldInfo',
    'fieldId'
  ],
  created () {
    // console.log(this.fieldInfo)
  },
  data () {
    return {
      // fieldInfoDetail: {},
      fieldName: this.fieldInfo.fieldName,
      north: this.fieldInfo.north,
      south: this.fieldInfo.south,
      east: this.fieldInfo.east,
      west: this.fieldInfo.west,
      fieldType: this.fieldInfo.fieldType,
      selected: this.fieldInfo.pathLossModel
    }
  },
  // watch: {
  //   fieldName: () => {
  //     // console.log(this.fieldType)
  //   }
  // },
  methods: {
    editFieldParam () {
      let attr = {
        'fieldId': this.fieldId,
        'fieldName': this.fieldName,
        'fieldType': this.fieldType,
        'pathLossModel': this.selected,
        'north': this.north,
        'south': this.south,
        'east': this.east,
        'west': this.west,
        'adminAccount': 'root',
        'enableOAMGPS': 1
      }
      console.log(attr)
      this.$http.post('http://211.20.94.206:5888/son/field/modifyField', attr)
        .then(rsp => {
          // console.log(rsp)
          return this.$http.get('http://211.20.94.206:5888/son/field/fieldList')
        })
        .then(rsp => {
          // this.$root.reload()
          // let param = {}
          // rsp.body.fieldList.forEach(el => {
          //   if (el.fieldId === this.$route.params.id) {
          //     // console.log(`find ${el.fieldId}`)
          //     console.log(el)
          //     param = el
          //   }
          //   if (param !== undefined) {
          //     this.north = Number(param.north)
          //     this.south = Number(param.south)
          //     this.east = Number(param.east)
          //     this.west = Number(param.west)
          //     this.fieldName = param.fieldName
          //     this.fieldType = param.fieldType
          //     this.pathLossModel = param.pathLossModel
          //   }
          // })
        })
    }
  }
}
</script>

<style scoped>
  .modal-dialog {
    max-width: 800px;
    /* margin: auto; */
  }
</style>
