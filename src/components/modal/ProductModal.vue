<template>
  <div class="modal fade" tabindex="-1" role="dialog" id="productModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" >Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  props: ["dataInit"],
  data() {
    return {
      data: this.dataInit
    };
  },
  methods: {
    getChildText: function(data) {
      console.log(data)
      $('#productModal').modal('show')
      this.$emit("update-text", this.data);
    }
  }
};
</script>

<style>
</style>