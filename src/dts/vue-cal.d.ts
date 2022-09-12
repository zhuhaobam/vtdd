declare module 'vue-cal' {
  import Vue from 'vue'

  // const VueCal = Vue.extend<VueCalProps>(Vue);

  export type FormattedDate = string // eg (e.g. 2020-09-18)
  export type View = 'years' | 'year' | 'month' | 'week' | 'day'
  export type WeekDays = 1 | 2 | 3 | 4 | 5 | 6 | 7

  export interface SplitDaysAttributes {
    id: string | number
    class: string
    label: string
    hide: boolean
  }

  export interface EditableEvents {
    title: boolean
    drag: boolean
    resize: boolean
    delete: boolean
    create: boolean
  }

  /**
   * If no title is provided, no title will be displayed.
   * content accepts free HTML, for instance: '<i class="v-icon material-icons">local_hospital</i>'.
   * If no content is provided, no content will be displayed.
   * You may need an event CSS class to handle different event types for instance. With different classes you can apply different styles to the events.
   * E.g. backgrounds, images, borders, etc.
   * The background attribute sets an event as a background event, which allows overlapping and disable the ability to drag & resize.
   * When using splitDays, the split attribute accepts a number, starting from 1, corresponding to the split you want the event to appear in.
   * Optionally, if you have set the id property in splitDays, you have to use the same id here (Integer or String).
   * When the showAllDayEvents and time options are set to true, all the events with an attribute allDay set to true will show up in a fixed bar (week & day views).
   */
  export interface Event {
    _eid?: string
    start: string | Date // '2018-11-19 12:00', // Required.
    end: string | Date // '2018-11-19 14:00', // Required.
    // Instead of formatted dates, you can also provide Javascript Date objects:
    // start: new Date(2018, 11 - 1, 19, 12, 0),
    // end: new Date(2018, 11 - 1, 19, 14, 0),
    title?: string // Optional.
    content?: string // Optional.
    contentFull?: string // opens in a  d ialog
    class?: string // Optional - space-separated css classes.
    background?: boolean // Optional. (Event type not CSS property)
    split?: number | string // Optional.
    allDay?: boolean // Optional.
    deletable?: boolean // optional - force undeletable when events are editable.
    resizable?: boolean // optional - force unresizable when events are editable.
    startTimeMinutes?: number
    endTimeMinutes?: number
  }

  export interface Event {
    created_at?: string | Date
    updated_at?: string | Date
    created_by_id?: number
    id?: number
  }

  export type OnEventClick = (event: Event, e: MouseEvent) => void

  export interface EventReadyChanged {
    view: string
    startDate: Date // View start - JS native Date object.
    endDate: Date // View end - JS native Date object.
    firstCellDate: Date // Month view only, in case cell is out of current month - JS native Date object.
    lastCellDate: Date // Month view only, in case cell is out of current month - JS native Date object.
    outOfScopeEvents: Array<Event> // Month view only, all the events that are out of the current month.
    events: Array<Event> // All the events in the current view.
    week: number // Week number. Only returned if view is 'week'.
  }

  export interface EventChange {
    event: Event
    originalEvent: Event
  }

  export interface EventTitleChange {
    event: Event
    oldTitle: string
  }

  export interface EventDurationChange extends EventChange {
    oldDate: Date
  }

  export interface Events {
    ready: EventReadyChanged
    'view-change': EventReadyChanged
    'cell-click': Date
    'cell-dblclick': Date
    'cell-contextmenu': Date & { x: number; y: number }
    'cell-keypress-enter': Date
    'cell-focus': Date
    'event-focus': Event
    'event-mouse-enter': Event
    'event-mouse-leave': Event
    'event-create': Event
    'event-drag-create': Event
    'event-delete': Event
    'event-title-change': Event
    'event-duration-change': EventDurationChange
    'event-resizing': any
    'event-drop': any
    'event-change': EventChange
  }

  export type EventListeners = {
    [A in keyof Events]: (value: Events[A]) => void
  }

  export interface VueCalEvent extends Event {
    daysCount: number
    deleting: boolean
    draggable: boolean
    dragging: boolean
    draggingStatic: boolean
    endTimeMinutes: number
    focused: boolean
    repeat: boolean
    resizing: boolean
    segments: any
    titleEditable: boolean
  }

  export interface VueCalView {
    id: string
    title: string
    startDate: any
    endDate: any
    firstCellDate: any
    lastCellDate: any
    selectedDate: any
    events: VueCalEvent[]
  }

  export interface Props {
    activeView?: View //default?: 'week'
    /** When the all day bar is visible and Vue Cal is also scrollable horizontally (due to minCellWidth or day splits with minSplitWidth), the all-day bar must have a fixed height for this particular layout.
     * Only if these conditions are fulfilled, the height provided through this option will be used. If none is provided the default height will be used.
     * The height can be any valid CSS height (as a string) or an integer for an amount of pixels. */
    allDayBarHeight?: string | number //default?: '25px'
    cellClickHold?: boolean //default?: true
    /** When set to true, a right click on a cell will emit the cell-contextmenu event, providing an object containing?: the date and time at cursor, the x and y position of cursor, and the full original DOM event. */
    cellContextmenu?: boolean //default?: false
    clickToNavigate?: boolean //default?: false
    dblclickToNavigate?: boolean //default?: true
    disableDatePrototypes?: boolean //default?: false
    /** Allows you to provide an array of formatted dates (e.g. 2020-09-18) to disable. */
    disableDays?: Array<FormattedDate> //default?: []
    disableViews?: Array<View> //default?: []
    dragToCreateEvent?: boolean //default?: true
    dragToCreateThreshold?: number //default?: 15
    /** When editableEvents is set to true, it allows?:
       Dragging and dropping events
       Resizing events by dragging the handle showing at the bottom of each event if time is set to true,
       Deleting events by click and hold an event.
       Editing events title */
    editableEvents?: boolean | EditableEvents //default?: false
    events?: Array<Event> //default?: [
    eventsCountOnYearView?: boolean //default?: false
    eventsOnMonthView?: boolean | string //default?: false
    hideBody?: boolean //default?: false
    /** When set to true, the title bar with navigating arrows will disappear. You can still navigate from a view to another with the view selector and clicking a cell (narrower view).*/
    hideTitleBar?: boolean //default?: false
    /** When set to true, the top view selector will disappear.  You can still navigate from a view to another by clicking a cell (narrower view) or the view title (broader view). */
    hideViewSelector?: boolean //default?: false
    /** Hide particular days of the week. This option accepts an array of days (day numbers) to hide, starting at 1 for Monday, to 7 for Sunday. */
    hideWeekdays?: Array<WeekDays> //default?: []
    hideWeekends?: boolean //default?: false
    locale?: string //default?: 'en'
    maxDate?: string | Date //efault?: ''
    /** When a number is set, in pixels, each cell of the week view (only) will have this minimum width. If it does not fit in the calendar body, the overflow will be scrollable. If minSplitWidth is also set, it will override minCellWidth.*/
    minCellWidth?: number //default?: 0 // In pixels.
    minDate?: string | Date //efault?: ''
    minEventWidth?: number //default?: 0 // In percent.
    /** This is for day splits only, and it applies to the week and day views (only).
       When a number is set, in pixels, each split of each cell will have this minimum width.
       If it does not fit in the calendar body, the overflow will be scrollable.
       If minCellWidth is also set, minSplitWidth will override it on week view. */
    minSplitWidth?: number //default?: 0 // In pixels.
    onEventClick?: Function //default?: null
    onEventCreate?: Function //default?: null
    onEventDblclick?: Function //default?: null
    overlapsPerTimeStep?: boolean //default?: false
    resizeX?: boolean //default?: false
    selectedDate?: string | Date //default?: ''
    /**
       * When the showAllDayEvents is set to true the events with an allDay attribute set to true will be displayed in a fixed top bar on the week & day views.
       The all day events bar will only show up if the options showAllDayEvents & time are set to true.
       time is important since without time information every event is an all-day event there is no point in separating them then.
       * When showAllDayEvents is set to false, all the all day events (allDay attribute set to true), will show up as a normal background event.
       * On month view, switching showAllDayEvents on and off will not have any impact since both should display the all day events.
       * showAllDayEvents accepts a Boolean or the string 'short', to display only the event title. */
    showAllDayEvents?: boolean | 'short' //default?: false
    /** When set to true, the weeks numbers will show in the first column on the month view (only). You can also provide a custom renderer to the weeks numbers cells through the week-number-cell slot.*/
    showWeekNumbers?: boolean | string //default?: false
    /** When set to true, the days of the week headings will be truncated to 3 letters. Does not apply to the title of the day view. 2 media queries are truncating the days of the week bellow 450px,*/
    small?: boolean //default?: false
    /** With the snapToTime option, you can make sure the event starts and end at specific intervals of minutes.
       E.g. ?:snap-to-time="15" will snap the event to the closest ?:00, ?:15, ?:30, ?:45 while dragging.
       This option also applies on event resizing after the drag-creation. */
    snapToTime?: number //default?: null
    specialHours?: object //default?: {}
    /** Split each day into multiple vertical splits.
       Accepts an array of split objects with attributes.
       Each split object can have these attributes, they are all optional?: */
    splitDays?: Array<any> //default?: [
    startWeekOnSunday?: boolean //default?: false
    stickySplitLabels?: boolean //default?: false
    time?: boolean //default?: true
    timeCellHeight?: number //default?: 40 // In pixels.
    /**
     * When defined, overrides the default time format in time cells and events.
     * Formatted time can contain any character but the following characters will be replaced?:
     *
     * H?: Hours no leading zero, 24-hour format
     * HH?: Hours with leading zero, 24-hour format
     * h?: Hours no leading zero, 12-hour format
     * hh?: Hours with leading zero, 12-hour format
     * m?: Minutes no leading zero
     * mm?: Minutes with leading zero
     * {am}?: am or pm
     * The characters `{` and `}` are removed and used only to delimit keywords when there is no space.
     * E.g. "h?:mm{am}".
     */
    timeFormat?: string //default?: ''
    /** If time is enabled, set the start of the timeline in minutes. By default it starts at midnight. */
    timeFrom?: number //default?: 0 // In minutes.
    /** If time is enabled, set the time increment in minutes.  */
    timeStep?: number //default?: 30 // In minutes.
    /** If time is enabled, set the end of the timeline in minutes. By default it ends at 24?:00.  */
    timeTo?: number //default?: 24 * 60 // In minutes.
    /** Adds a Today button in the title bar to quickly go to Today's date. */
    todayButton?: boolean //default?: false
    transitions?: boolean //default?: true
    twelveHour?: boolean //default?: false
    /**
     * When set to true, the days of the week headings will be truncated to 1 letter. Does not apply to the title of the day view.
     * In Addition, the whole calendar gets applied a smaller font size of 0.9em, and the current view title is also reduced.
     * 2 media queries are truncating the days of the week bellow 450px,
     */
    xsmall?: boolean //default?: false
    watchRealTime?: boolean //default: false
  }

  export namespace slots {
    export namespace event {
      export interface Props {
        view: View
        event: VueCalEvent
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface VueCal extends Props {}

  export class VueCal extends Vue {
    $on<T extends keyof Events>(event: T, callback: EventListeners[T]) {
      return super.$on(event, callback)
    }

    //region: Data
    ready: boolean // Is vue-cal ready.
    // Make texts reactive before a locale is loaded.
    texts: any
    utils: {
      // Remove prototypes ASAP if the user wants so.
      date: any
      cell: any
      // Note: Destructuring class method loses the `this` context and Vue Cal becomes inaccessible
      // from the event utils function. Don't do:
      // const { eventInRange, createEventSegments } = this.utils.event
      event: any
    }
    modules: { dnd: null }

    minutesAtCursor(e: MouseEvent)

    // At any time this object will be filled with current view, visible events and selected date.
    view: VueCalView
    eventIdIncrement: number // Internal unique id.
    // or updated at least on each cells rerender, in order to keep Today's date accurate.
    now: Date

    //endregion
    // Useful when watchRealTime = true, 2 timeouts: 1 to snap to round minutes, then 1 every minute.
    timeTickerIds: [any, any]
    // An array of mutable events updated each time given external events array changes.
    mutableEvents: any
    // Transition when switching view. left when going toward the past, right when going toward future.
    transitionDirection: string

    //region: Methods
    /**
     * Shorthand function for external call (via $refs).
     */
    previous()

    /**
     * Shorthand function for external call (via $refs).
     */
    next()

    /**
     * On click on previous or next arrow, update the calendar visible date range.
     *
     * @param {Boolean} next
     */
    previousNext(next = true)

    // Preset at now date on load, but updated every minute if watchRealTime,

    /**
     * On click/dblclick of a cell go to a narrower view if available.
     * E.g. Click on month cell takes you to week view if not hidden, otherwise on day view if not hidden.
     *
     * @param {String | Date} date A starting date for the view, if none, fallbacks to the selected date,
     *                             If also empty fallbacks to the current view start date.
     */
    switchToNarrowerView(date = null)

    /**
     * Switches to the specified view on view selector click, or programmatically form external call (via $refs).
     * If a date is given, it will be selected and if the view does not contain it, it will go to that date.
     *
     * @param {String} view the view to go to. Among `years`, `year`, `month`, `week`, `day`.
     * @param {String | Date} date A starting date for the view, if none, fallbacks to the selected date,
     *                             If also empty fallbacks to the current view start date.
     * @param {Boolean} fromViewSelector to know if the caller is the built-in view selector.
     */
    switchView(view: ViewEvents, date: Date = null, fromViewSelector: boolean = false)

    // The events source of truth.

    /**
     * Creates a new event in vue-cal memory (in the mutableEvents array) starting at the given date & time.
     * Proxy method to allow call from cell click & hold or external call (via $refs).
     * Notes: Event duration is by default 2 hours. You can override the event end through eventOptions.
     *
     * @param {String | Date} dateTime date & time at which the event will start.
     * @param {Number} duration the event duration in minutes.
     * @param {Object} eventOptions an object of options to override the event creation defaults.
     *                              (can be any key allowed in an event object)
     * @return {Object} the created event.
     */
    createEvent(dateTime: string | Date, duration: number, eventOptions: Events = {})

    /**
     * Only import locale on demand to keep a small library weight.
     *
     * @param {String|Object} locale the language user whishes to have on vue-cal.
     */
    loadLocale(locale)

    //endregion
  }

  export default VueCal

  global {
    type VueCalDateTimeFormat =
      | (VueCalTimeFormat & string)
      | 'YYYY' // full year. E.g. `2019`
      | 'YY' //2 last digits of the year. E.g. `19`
      | 'MMMM' //month in full. E.g. `January`
      | 'MMM' // 3 first letters of the month. E.g. `Jan`
      | 'MM' // month number with leading zero. (01-12) E.g. `01`
      | 'M' // month number without leading zero. (1-12) E.g. `1`
      | 'DD' // date of the month with leading zero. (01-31) E.g. `01`
      | 'D' // date of the month without leading zero. (1-31) E.g. `1`
      | 'S' // (usually with surrounding `{ }`) only in English, will output `st`, `nd`, `rd` or `th`.
      | 'dddd' // day of the week in full. E.g. `Monday`
      | 'ddd' // 3 first letters of the day of the week. E.g. `Mon`
      | 'dd' // first letter of the day of the week. E.g. `M`
      | 'd' // number of the day of the week. (1-7) E.g. `1` for Monday

    type VueCalTimeFormat =
      | string
      | 'HH' // Hours with leading zero, 24-hour format. (00-24)E.g. `20`
      | 'H' // Hours without leading zero, 24-hour format. (0-24)E.g. `20`
      | 'hh' // Hours with leading zero, 12-hour format. E.g. `08`
      | 'h' // Hours without leading zero, 12-hour format. E.g. `8`
      | 'mm' // Minutes with leading zero. E.g. `08`
      | 'm' // Minutes without leading zero. E.g. `8`
      | 'am' // (usually with surrounding `{ }`) am or pm (also localized if any)

    interface Date {
      addDays(days: number): this // adds days to a Date object and returns it. The original Date stays untouched as a copy is made.
      subtractDays(days: number): this // Subtracts days to a Date object and returns it. The original Date stays untouched as a copy is made.
      addHours(hours: number): this //Adds hours to a Date object and returns it. The original Date stays untouched as a copy is made. `hours` is an integer.
      subtractHours(hours: number): this // Subtracts hours to a Date object and returns it. The original Date stays untouched as a copy is made. `hours` is an integer.
      addMinutes(minutes: number): this // Adds minutes to a Date object and returns it. The original Date stays untouched as a copy is made. `minutes` is an integer.
      subtractMinutes(minutes: number): this //Subtracts minutes to a Date object and returns it. The original Date stays untouched as a copy is made. `minutes` is an integer.
      getWeek(): number // Returns the week number (1 to 53) of a date.
      isToday(): boolean // Returns true if the date is Today.
      isLeapYear(): boolean //Returns true if the date is in a leap year.
      /**
           Returns a formatted date string. Default format is 'YYYY-MM-DD', but you can use any formatting keyword from this list, and add any character not present in this mapping:
           * YYYY: full year. E.g. `2019`
           * YY: 2 last digits of the year. E.g. `19`
           * MMMM: month in full. E.g. `January`
           * MMM: 3 first letters of the month. E.g. `Jan`
           * MM: month number with leading zero. (01-12) E.g. `01`
           * M: month number without leading zero. (1-12) E.g. `1`
           * DD: date of the month with leading zero. (01-31) E.g. `01`
           * D: date of the month without leading zero. (1-31) E.g. `1`
           * S: (usually with surrounding `{ }`) only in English, will output `st`, `nd`, `rd` or `th`.
           * dddd: day of the week in full. E.g. `Monday`
           * ddd: 3 first letters of the day of the week. E.g. `Mon`
           * dd: first letter of the day of the week. E.g. `M`
           * d: number of the day of the week. (1-7) E.g. `1` for Monday
           * And also all the keywords from the following formatTime() function.
           */
      format(format: VueCalDateTimeFormat): string

      /**
           Returns a formatted time string.
           The format() function can also do this, but this might be a shortcut if you just want the default time formatting.
           E.g. `formatTime()`).
           This function will also be slightly faster than format() as lighter in functionality.
           Default format is 'HH:mm', but you can use any formatting keyword from this list, and add any character not present in this mapping:
           * HH: Hours with leading zero, 24-hour format. (00-24)E.g. `20`
           * H: Hours without leading zero, 24-hour format. (0-24)E.g. `20`
           * hh: Hours with leading zero, 12-hour format. E.g. `08`
           * h: Hours without leading zero, 12-hour format. E.g. `8`
           * mm: Minutes with leading zero. E.g. `08`
           * m: Minutes without leading zero. E.g. `8`
           * am: (usually with surrounding `{ }`) am or pm (also localized if any)
           */
      formatTime(format: VueCalTimeFormat): string
    }
  }
}
