Template.WeatherSettingsBlock.onCreated(() => {
  Meteor.subscribe('dss-settings')
})

Template.WeatherSettingsBlock.onRendered(() => {
  $('#cms-weather-wu-key').addClass('is-dirty')
})

Template.WeatherSettingsBlock.helpers({
  wundergroundKey: () => {
    const record = DSSSettings.findOne({name: 'wunderground-api-key'})

    if (record && record.value) {
      $('#cms-weather-wu-key').addClass("is-dirty")
    }
    return record && record.value
  }
})

Template.WeatherSettingsBlock.events({
  'click #cms-weather-wu-key-save': () => {
    const key = $('#cms-weather-wu-key-input').val()

    Meteor.call('cms-weather-wu-key-edit', key, (error, result) => {
      let toast = 'Key Saved'
      if (error) {
        toast = 'Unable to save key'
      }
      showToast(toast)
    })
  }
})