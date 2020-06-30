<template>
  <div id='field'>
    <Modaldog v-if='showEditFieldModal' :fieldInfo='fieldInfo' :fieldId='this.$route.params.id' style='display:block' @close="showEditFieldModal = false">
    </Modaldog>
    <div class="col-md-8" id='mapZone'>
      <div class="btn-group">
        <button type="button" class="btn btn-info"><strong>場域配置</strong></button>
        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="caret"  style="margin: 0"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu">
          <li @click="showEditFieldModal=true" style="cursor: pointer;">場域編輯</li>
          <li><a href="">運行策略</a></li>
        </ul>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-info"><strong>場域報表</strong></button>
        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="caret" style="margin: 0"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu">
          <li><a href="">場域效能</a></li>
          <!-- <li><a href="">網路訊號即時回報</a></li> -->
          <li><router-link to="/field/mdt">網路訊號即時回報</router-link></li>
        </ul>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-info"><strong>場域優化</strong></button>
        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="caret" style="margin: 0"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu">
          <li><a href="">立即執行</a></li>
        </ul>
      </div>
      <button type="button" class="btn btn-info pull-right" :style="mapBtnDsp" id="btn_show_map_deivce" @click="switchList()">{{"基地台列表("+deviceList.length+")"}}</button>
      <button type="button" class="btn btn-info pull-right" :style="listBtnDsp" id="btn_show_map_deivce" @click="switchMap()">地圖模式</button>
      <!-- MAP AND LIST -->
      <div id="gmap" :style="mapDsp" class="map_scope"></div>
      <div class="celllist clearfix" id="list" :style="listDsp">
        <h4>基地台列表</h4>
        <div class="row">
          <div class="col-md-6 cellnum">
            目前有{{deviceList.length}}台基地台
          </div>
        </div>
        <table class='table table-hover table-primary'>
          <thead class='thead-dark'>
          <tr>
          <th v-for="(item,key) in deviceListParam" :key="key">{{item}}</th>
          </tr>
          </thead>
          <tbody id="device_list_tbody">
            <tr v-for="(item,key) in deviceList" :key="key">
              <th>{{key+1}}</th>
              <th>{{item.deviceId}}</th>
              <th>{{item.ipAddress}}</th>
              <th>{{item.pci}}</th>
              <th>{{item.txPower}}</th>
              <th>{{item.beamPattern}}</th>
              <th>{{item.status}}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-md-4" id="panelZone" style="overflow: auto">
      <!-- <div class="panel-group"> -->
        <div id="collapseOne" class="card panel">
          <div class="card-header bg-info">
            <a class="accordion-toggle" data-toggle="collapse" href="#collapsefirst" aria-expanded="true">
              <strong>Cell Information</strong>
            </a>
          </div>
          <div class="collapse show" id="collapsefirst">
            <div class="card-body bg-light">
              <table>
                <tbody id="cell_info_area">
                  <tr v-for="(item,key) in cellInfo" :key="key">
                    <td>{{item}}</td>
                    <!-- <td>0</td> -->
                    <td v-if="deviceList[0] != undefined">{{fillCellInfo(key)}}</td>
                    <!-- <td>123</td> -->
                    <!-- <td>{{deviceList[key].deviceId}}</td> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div id="collapseTwo" class="card panel">
          <div class="card-header bg-info">
            <a class="accordion-toggle" data-toggle="collapse" href="#collapseSec" aria-expanded="true">
              <strong>Neighbor List</strong>
            </a>
          </div>
          <div class="collapse show" id="collapseSec">
            <div class="card-body bg-light">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>PCI</th>
                    <th>Cell ID</th>
                    <th>PLMN ID</th>
                  </tr>
                </thead>
                <tbody id="anr_config_area">
                    <tr v-for="(item,key) in neighborExam" :key=key>
                      <td>#</td>
                      <td>{{item.pci}}</td>
                      <td>{{item.cellId}}</td>
                      <td>{{item.plmnId}}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div id="collapseThree" class="card">
          <div class="card-header bg-info">
            <a class="accordion-toggle" data-toggle="collapse" href="#collapseThird" aria-expanded="true">
             <strong>Cell Settings</strong>
            </a>
          </div>
          <div class="collapse show" id="collapseThird">
            <div class="card-body bg-light">
              <table id="cell_config_table">
                  <tbody id="cell_config_area">
                    <tr v-for="(item,key) in cellSet" :key="key">
                      <td>{{item}}</td>
                      <!-- <td><input type="text" v-model="deviceList[focusEnb].ipAddress"></td> -->
                      <td v-if="deviceList[0] != undefined"><input type="text" :value="fillCellSetting(key)"></td>
                      <!-- <td><input type="text" :value="0"></td> -->
                    </tr>
                  </tbody>
              </table>
              <center><button class="btn btn-warning " id='btn-fixparam'>修改參數</button></center>
            </div>
          </div>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import EditFieldModal from './EditFieldModal.vue'

export default {
  name: 'Field',
  data () {
    return {
      showEditFieldModal: false,
      msg: 'SON',
      fieldInfo: {
        north: 0,
        south: 0,
        west: 0,
        east: 0,
        fieldName: ''
      },
      focusEnb: 0,
      mapBtnDsp: {'display': 'inline-block'},
      listBtnDsp: {'display': 'none'},
      mapDsp: {'display': 'block'},
      listDsp: {'display': 'none'},
      deviceListParam: ['No', 'Device ID', 'IP Address', 'PCI', 'TxPower', 'Beam Pattern', 'Status'],
      neighborExam: [
        {
          'pci': 1,
          'cellId': 1,
          'plmnId': 46656
        },
        {
          'pci': 2,
          'cellId': 2,
          'plmnId': 46656
        }
      ],
      cellInfo: ['Device ID', 'IP Address', 'Location', 'Physical Cell ID', 'Cell Identity', 'Last Inform Time'],
      cellSet: ['Physical Cell ID', 'Cell Identity', 'PLMN Identity', 'Txpower (dbm)', 'UL EARFCN', 'DL EARFCN', 'Beam Pattern No.', 'Longitude', 'Latitude'],
      deviceList: [],
      gMapParams: {
        gmap: null
      },
      counter: 0
    }
  },
  components: {
    Modaldog: EditFieldModal
  },
  computed: {},
  // props: ['fieldId'],
  mounted () {
    this.$http.get('http://10.101.129.52:5888/son/field/fieldList')
      .then(rsp => {
        let param = {}
        // console.log(rsp.body.fieldList)
        rsp.body.fieldList.forEach(el => {
          if (el.fieldId === this.$route.params.id) {
            console.log(`find ${el.fieldId}`)
            param = el
          }
        })
        // let param = rsp.body.fieldList[1]
        // console.log(param.east)
        if (param !== undefined) {
          // console.log('HAA')
          this.fieldInfo.north = Number(param.north)
          this.fieldInfo.south = Number(param.south)
          this.fieldInfo.east = Number(param.east)
          this.fieldInfo.west = Number(param.west)
          this.fieldInfo.fieldName = param.fieldName
          this.fieldInfo.fieldType = param.fieldType
          // this.fieldInfo.northMap = param.extraInfo.northMap
          // this.fieldInfo.southMap = param.extraInfo.southMap
          // this.fieldInfo.eastMap = param.extraInfo.eastMap
          // this.fieldInfo.westMap = param.extraInfo.westMap
          this.fieldInfo.pathLossModel = param.pathLossModel
          this.initMap()
        }
        let attr = {
          // 'fieldId': this.$router.params,
          fieldId: this.$route.params.id,
          'deviceList': []
        }
        return this.$http.post('http://10.101.129.51:5888/hems/getCertainParameters', attr)
      })
      .then(rsp => {
        let param = rsp.data.parameter
        for (let i = 0; i < param.length; i++) {
          console.log(param[i])
          let device = {
            'No': i + 1,
            'plmn': param[i]['strPlmnId'],
            'ipAddress': param[i]['strDeviceIP'],
            'deviceId': param[i]['deviceName'],
            'pci': param[i]['strPhyCellID'],
            'cellId': param[i]['strCellID'],
            'txPower': param[i]['strReferenceSignalPower'],
            'beamPattern': param[i]['strBeamPatternNo'],
            'dlEarfcn': param[i]['strDlEarfcn'],
            'ulEarfcn': param[i]['strUlEarfcn'],
            'status': 'Active',
            'gps': {'lat': param[i]['strLatitude'], 'lng': param[i]['strLongitude']},
            'lastInform': param[i]['strLastInform']
          }
          this.deviceList.push(device)
        }
        // console.log(param)
        return this.$http.get(`http://10.101.129.52:5888/son/oam/${this.$route.params.id}/DeviceListSort?key=`)
      })
      .then(rsp => {
        // console.log(rsp.body.devices)
        let param = rsp.body.devices
        for (let i = 0; i < this.deviceList.length; i++) {
          this.deviceList[i]['gps']['lat'] = param[i]['latitude']
          this.deviceList[i]['gps']['lng'] = param[i]['longitude']
        }
        this.initMapMarker()
        // console.log(this.$route.params.id)
      }
      )
      .catch(err => {
        console.log(err)
      })
    // this.initMap()
    this.initMapMarker()
  },
  methods: {
    initMap () {
      // eslint-disable-next-line no-undef
      this.gmap = new google.maps.Map(document.getElementById('gmap'), {
        center: { lat: (this.fieldInfo.north + this.fieldInfo.south) / 2, lng: (this.fieldInfo.east + this.fieldInfo.west) / 2 },
        zoom: 21,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: false,
        mapTypeControl: false
      })
    },
    initMapMarker () {
      for (let i = 0; i < this.deviceList.length; i++) {
        // eslint-disable-next-line no-undef
        let latlng = new google.maps.LatLng(this.deviceList[i].gps.lat, this.deviceList[i].gps.lng)
        // eslint-disable-next-line no-undef
        let oMarker = new google.maps.Marker({
          // position: latlng,
          map: this.gmap,
          // icon: IconNormal,
          draggable: false,
          zIndex: 1,
          label: String(this.deviceList[i].pci)
          // label: '0'
        })
        oMarker.setPosition(latlng)
        // eslint-disable-next-line no-undef
        google.maps.event.addListener(oMarker, 'click', () => { this.focusEnb = this.deviceList[i].No - 1 })
      }
    },
    switchList () {
      console.log('switch to list mode')
      this.mapBtnDsp.display = 'none'
      this.listBtnDsp.display = 'inline-block'
      this.mapDsp.display = 'none'
      this.listDsp.display = 'block'
    },
    switchMap () {
      console.log('switch to map mode')
      this.mapBtnDsp.display = 'inline-block'
      this.listBtnDsp.display = 'none'
      this.mapDsp.display = 'block'
      this.listDsp.display = 'none'
    },
    fillCellInfo (key) {
      switch (key) {
        case 0:
          return this.deviceList[this.focusEnb].deviceId
        case 1:
          return this.deviceList[this.focusEnb].ipAddress
        case 2:
          return this.deviceList[this.focusEnb].gps.lat + ',' + this.deviceList[this.focusEnb].gps.lng
        case 3:
          return this.deviceList[this.focusEnb].pci
        case 4:
          return this.deviceList[this.focusEnb].pci
        case 5:
          return this.deviceList[this.focusEnb].lastInform
        default:
          return NaN
      }
    },
    fillCellSetting (key) {
      switch (key) {
        case 0:
          return this.deviceList[this.focusEnb].pci
        case 1:
          return this.deviceList[this.focusEnb].pci
        case 2:
          return this.deviceList[this.focusEnb].plmn
        case 3:
          return this.deviceList[this.focusEnb].txPower
        case 4:
          return this.deviceList[this.focusEnb].dlEarfcn
        case 5:
          return this.deviceList[this.focusEnb].ulEarfcn
        case 6:
          return this.deviceList[this.focusEnb].beamPattern
        case 7:
          return this.deviceList[this.focusEnb].gps.lng
        case 8:
          return this.deviceList[this.focusEnb].gps.lat
        default:
          return NaN
      }
    }
  }
}
</script>

<style scoped>
#gmap {
  /* border: 100em; */
  width: 100%;
  height: 700px;
  box-sizing: border-box;
  /* background-color: rgb(19, 224, 163); */
}

#list {
  padding-top: 10px;
  /* padding-bottom: 10px; */
}

#mapZone {
  display: inline-block;
  background-color: rgb(225, 255, 244);
  /* border: 1px solid rgb(74, 153, 255); */
  /* width: 60%; */
  padding-top: 10px;
  padding-bottom: 10px;
  /* height: 600px; */
  box-sizing: border-box;
}

.map_scope {
  border: 1px solid rgb(112, 174, 255);
  /* width: 60%; */
  margin-top: 10px;
  /* float: left; */
  /* height: 100%; */
  /* display: inline-block; */
}

#panelZone {
  /* border: 1px solid rgb(112, 174, 255); */
  background: rgb(225, 255, 244);
  width: 40%;
  /* height: 765px; */
  /* padding-top: 10px;
  box-sizing: border-box; */
  /* display: inline-block; */
  /* float: right; */
}

#btn_show_map_deivce {
  float: right;
  width: 150px;
}

#field {
  display: flex;
  height: 900px;
  /* background: rgb(173, 142, 56); */
  /* border: 1px solid rgb(207, 21, 21);; */
  /* padding-top: 10px; */
}

strong {
  color: #fff;
}

.panel {
  margin-top: 10px;
  margin-bottom: 10px;
}

#collapseOne table tr {
  border-bottom: 2px solid #fff;
  padding: 10px;
}

#collapseThree table tr {
  border-bottom: 2px solid #fff;
  padding: 10px;
}

#collapseTwo table tr {
  border-bottom: 1px solid #fff;
}
#collapseTwo table thead tr {
  border-bottom: 2px solid #fff;
}

table {
  width: 100%;
  /* border-collapse: collapse;
  border: 0px groove; */
}

.table-primary {
  background: rgb(243, 255, 255);
}

.table-primary th {
  border-top: 1px solid #dee2e6;
}

#btn-fixparam {
  margin-top: 10px;
}

</style>
