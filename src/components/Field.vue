<template>
  <div>
    <div class="col-md-12">
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
    <button type="button" class="btn btn-info pull-right" :style="mapBtnDsp" id="btn_show_map" @click="switchList()">{{"基地台列表("+deviceList.length+")"}}</button>
    <button type="button" class="btn btn-info pull-right" :style="listBtnDsp" id="btn_show_device_list" @click="switchMap()">地圖模式</button>
    </div>
    <div>
      <div class="maptitle col-md-12" id="map_scope" >
        <div id="gmap" :style="mapDsp"></div>
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
      <div class="col-md-4" id="panel_device_info">
      <div class="panel panel-default">
        <div id="collapseOne" class="panel">
          <div class="panel-heading">
            <h4 class="panel-title">
              <a class="accordion-toggle " data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true">
                Cell Information
              </a>
            </h4>
          </div>
          <table>
            <tbody id="cell_info_area">
              <tr v-for="(item,key) in cellInfo" :key="key">
                <td>{{item}}</td>
                <td>{{fillCellInfo(key)}}</td>
                <!-- <td>123</td> -->
                <!-- <td>{{deviceList[key].deviceId}}</td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <div id="collapseTwo" class="panel">
          <div class="panel-heading">
            <h4 class="panel-title">
              <a class="accordion-toggle " data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true">
                Neighbor List
              </a>
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
              <a class="accordion-toggle " data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true">
                Cell Settings
              </a>
            </h4>
          </div>
          <table id="cell_config_table">
              <tbody id="cell_config_area">
                <tr v-for="(item,key) in cellSet" :key="key">
                  <td>{{item}}</td>
                  <!-- <td><input type="text" v-model="deviceList[focusEnb].ipAddress"></td> -->
                  <td><input type="text" :value="fillCellSetting(key)"></td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Field',
  data () {
    return {
      msg: 'SON',
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
      deviceList: [
        {
          'No': 1,
          'plmn': 46656,
          'deviceId': 'QWE',
          'ipAddress': '10.101.129.1',
          'pci': 1,
          'txPower': 0,
          'beamPattern': 900,
          'earfcn': 43290,
          'status': 'Active',
          'gps': {'lat': 24, 'lng': 120.495},
          'lastInform': '20200618 12:00:00'
        },
        {
          'No': 2,
          'plmn': 46656,
          'deviceId': 'ABC',
          'ipAddress': '10.101.129.2',
          'pci': 2,
          'txPower': 0,
          'beamPattern': 900,
          'earfcn': 43290,
          'status': 'Active',
          'gps': {'lat': 24, 'lng': 120.500},
          'lastInform': '20200618 12:00:00'
        },
        {
          'No': 3,
          'plmn': 46656,
          'deviceId': 'HJK',
          'ipAddress': '10.101.129.3',
          'pci': 3,
          'txPower': 0,
          'beamPattern': 900,
          'earfcn': 43290,
          'status': 'Active',
          'gps': {'lat': 24, 'lng': 120.505},
          'lastInform': '20200618 12:00:00'
        }
      ],
      gMapParams: {
        gmap: null
      },
      counter: 0
    }
  },
  computed: {
    // fillCellSetting (key) {
    //   return key
    // }
  },
  mounted () {
    this.initMap()
    this.initMapMarker()
    // this.setMarker()
  },
  methods: {
    initMap () {
      // eslint-disable-next-line no-undef
      this.gmap = new google.maps.Map(document.getElementById('gmap'), {
        center: { lat: 24, lng: 120.5 },
        zoom: 15,
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
          return this.deviceList[this.focusEnb].earfcn
        case 5:
          return this.deviceList[this.focusEnb].earfcn
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
  height: 600px;
  /* background-color: rgb(19, 224, 163); */
}

#map_scope {
  border: 1px solid rgb(112, 174, 255);
  width: 60%;
  margin: 1em;
  float: left;
  height: 100%;
}

#panel_device_info {
  border: 1px solid rgb(112, 174, 255);
  background: rgb(223, 237, 255);
  width: 40%;
  height: 100%;
  margin: 1em;
  display:inline-block;
  /* float: right; */
}

#collapseOne {
  margin: 0.5em;
  padding: 0.5em;
  /* border: 1px solid rgb(112, 174, 255); */
}

#collapseTwo {
  margin: 0.5em;
  padding: 0.5em;
  /* border: 1px solid rgb(112, 174, 255); */
}

#collapseThree {
  margin: 0.5em;
  padding: 0.5em;
  /* border: 1px solid rgb(112, 174, 255); */
}
</style>
