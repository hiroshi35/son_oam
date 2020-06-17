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
          <li><a href="">網路訊號即時回報</a></li>
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
    <button type="button" class="btn btn-info pull-right" :class="{mapDsp}" id="btn_show_map" @click="switchList()">地圖模式</button>
    <button type="button" class="btn btn-info pull-right" :class="{display:listDsp}" id="btn_show_device_list" @click="counter+=1">基地台列表 (0)</button>
    {{ counter }}
    </div>
    <div>
      <div class="maptitle col-md-12" id="map_scope" >
        <div id="gmap"></div>
      </div>
      <div class="col-md-4" id="panel_device_info">
      <div class="panel panel-default">
        <div id="collapseOne" class="panel">
          <table>
            <tbody id="cell_info_area">
            <tr>
              <td>Device ID</td>
              <td id="cia_id"></td>
            </tr>
            <tr>
              <td>IP Address</td>
              <td id="cia_ip"></td>
            </tr>
            <tr>
              <td>Location</td>
              <td id="cia_loc"></td>
            </tr>
            <tr>
              <td>Physical Cell ID</td>
              <td id="cia_pci"></td>
            </tr>
            <tr>
              <td>Cell Identity</td>
              <td id="cia_ci"></td>
            </tr>
            <tr>
              <td>Last Inform Time</td>
              <td id="cia_lit"></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div id="collapseTwo" class="panel">
          <div class="panel-body">
            <table>
              <thead>
                <tr>
                  <th>PCI</th>
                  <th>Cell ID</th>
                  <th>PLMN ID</th>
                </tr>
              </thead>
              <tbody id="anr_config_area">
                  <tr><td>#</td><td></td><td></td><td></td></tr>
                  <tr><td>#</td><td></td><td></td><td></td></tr>
                  <tr><td>#</td><td></td><td></td><td></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div id="collapseThree" class="panel">
          <table id="cell_config_table">
              <tbody id="cell_config_area">
                  <tr>
                      <td>Physical Cell ID</td>
                      <td>
                          <input type="text" value="499" id="cs_pci">
                      </td>
                      <td id="cs_pci_pending"></td>
                  </tr>
                  <tr>
                      <td>Cell Identity</td>
                      <td>
                          <input type="text" value="304" id="cs_cid">
                      </td>
                      <td id="cs_cid_pending"></td>
                  </tr>
                  <tr>
                      <td>PLMN Identity</td>
                      <td>
                          <input type="text" value="46001" id="cs_plmn">
                      </td>
                      <td id="cs_plmn_pending"></td>
                  </tr>
                  <tr>
                      <td>Txpower (dbm)</td>
                      <td>
                          <input type="number" step="1" value="-30" id="cs_rsp">
                      <td id="cs_rsp_pending"></td>
                  </tr>
                  <tr>
                      <td>UL EARFCN</td>
                      <td>
                          <input type="text" value="38850" id="cs_ul_earfcn">
                      </td>
                      <td id="cs_ul_earfcn_pending"></td>
                  </tr>
                  <tr>
                      <td>DL EARFCN</td>
                      <td>
                          <input type="text" value="38850" id="cs_dl_earfcn">
                      </td>
                      <td id="cs_dl_earfcn_pending"></td>
                  </tr>
                  <tr>
                      <td>Beam Pattern No.</td>
                      <td>
                          <input type="text" value="1000" id="cs_beam_pattern_no">
                      </td>
                      <td id="cs_beam_pattern_no_pending"></td>
                  </tr>
                  <tr>
                      <td>Longitude</td>
                      <td>
                          <input type="text" value="124.235" id="cs_longitude">
                      </td>
                      <td></td>
                  </tr>
                  <tr>
                      <td>Latitude</td>
                      <td>
                          <input type="text" value="24.457" id="cs_latitude">
                      </td>
                      <td></td>
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
      mapDsp: 'none',
      listDsp: 'static',
      gMapParams: {
        gmap: null
      },
      counter: 0
    }
  },
  mounted () {
    this.initMap()
    // this.setMarker()
  },
  methods: {
    initMap () {
      // eslint-disable-next-line no-undef
      this.gmap = new google.maps.Map(document.getElementById('gmap'), {
        center: { lat: 24, lng: 121 },
        zoom: 15,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: false,
        mapTypeControl: false
      })
    },
    switchList () {
      console.log('yoyoman')
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
