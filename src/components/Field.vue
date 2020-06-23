<template>
  <div id='field'>
    <div class="col-md-8" id='mapZone'>
      <div class="btn-group">
        <button type="button" class="btn btn-info">場域配置</button>
        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="caret"  style="margin: 0"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu">
          <li><a href="">場域編輯</a></li>
          <li><a href="">運行策略</a></li>
        </ul>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-info">場域報表</button>
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
        <button type="button" class="btn btn-info">場域優化</button>
        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="caret" style="margin: 0"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu">
          <li><a href="">立即執行</a></li>
        </ul>
      </div>
      <button type="button" class="btn btn-info" :style="mapBtnDsp" id="btn_show_map" @click="switchList()">{{"基地台列表("+deviceList.length+")"}}</button>
      <button type="button" class="btn btn-info" :style="listBtnDsp" id="btn_show_device_list" @click="switchMap()">地圖模式</button>
      <!-- MAP AND LIST -->
      <div id="gmap" :style="mapDsp" class="map_scope"></div>
      <div class="celllist panel-body clearfix" id="list" :style="listDsp">
        <h4>基地台列表</h4>
        <div class="row">
          <div class="col-md-6 cellnum">
            目前有<strong>{{deviceList.length}}</strong>台基地台
          </div>
        </div>
        <table class="table">
          <thead>
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
    <div class="col-md-4" id="panelZone">
      <!-- <div class="panel panel-default"> -->
        <div id="collapseOne" class="panel">
          <div class="panel-heading">
            <h4 class="panel-title">
              <!-- <a class="accordion-toggle " data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true"> -->
                Cell Information
              <!-- </a> -->
            </h4>
          </div>
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
        <div id="collapseTwo" class="panel">
          <div class="panel-heading">
            <h4 class="panel-title">
              <!-- <a class="accordion-toggle " data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true"> -->
                Neighbor List
              <!-- </a> -->
            </h4>
          </div>
          <div class="panel-body">
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
        <div id="collapseThree" class="panel">
          <div class="panel-heading">
            <h4 class="panel-title">
              <!-- <a class="accordion-toggle " data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true"> -->
                Cell Settings
              <!-- </a> -->
            </h4>
          </div>
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
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Field',
  data () {
    return {
      msg: 'SON',
      mapInfo: {
        north: 0,
        south: 0,
        west: 0,
        east: 0,
        fieldName: 'ITRI-ALPHA-5F'
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
  computed: {},
  mounted () {
    this.$http.get('http://10.101.129.52:5888/son/field/fieldList')
      .then(rsp => {
        // console.log(rsp.body.fieldList[1])
        let param = rsp.body.fieldList[1]
        // console.log(param.east)
        if (param !== undefined) {
          // console.log('HAA')
          this.mapInfo.north = Number(param.north)
          this.mapInfo.south = Number(param.south)
          this.mapInfo.east = Number(param.east)
          this.mapInfo.west = Number(param.west)
          this.initMap()
        }
        let attr = {
          'fieldId': '710',
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
        return this.$http.get('http://10.101.129.52:5888/son/oam/710/DeviceListSort?key=')
      })
      .then(rsp => {
        console.log(rsp.body.devices)
        let param = rsp.body.devices
        for (let i = 0; i < this.deviceList.length; i++) {
          this.deviceList[i]['gps']['lat'] = param[i]['latitude']
          this.deviceList[i]['gps']['lng'] = param[i]['longitude']
        }
        this.initMapMarker()
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
        center: { lat: (this.mapInfo.north + this.mapInfo.south) / 2, lng: (this.mapInfo.east + this.mapInfo.west) / 2 },
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
  background: rgb(223, 237, 255);
  /* width: 40%; */
  height: 765px;
  padding-top: 10px;
  box-sizing: border-box;
  /* display: inline-block; */
  /* float: right; */
}

#collapseOne {
  /* margin: 0.5em;
  padding: 0.5em; */
  /* border: 1px solid rgb(112, 174, 255); */
}

#collapseTwo {
  /* margin: 0.5em;
  padding: 0.5em; */
  /* border: 1px solid rgb(112, 174, 255); */
}

#collapseThree {
  /* margin: 0.5em;
  padding: 0.5em; */
  /* border: 1px solid rgb(112, 174, 255); */
}

#field {
  display: flex;
  /* background: rgb(173, 142, 56); */
  /* border: 1px solid rgb(207, 21, 21);; */
  /* padding-top: 10px; */
}

h4 {
  color: rgb(1, 60, 255);
}

</style>
