import { getAssetsDirFile } from '@/plugins/assets-kit'
import { musicMenuType, musicLyricsType, musicSrcType } from '@/types/musicType'
/**
 *
 * @returns 歌曲列表
 */
const musicMenuListData = (): musicMenuType[] => {
  return [
    {
      name: '孤勇者',
      mv: 1,
      fee: 1,
      id: '1901371647',
      dt: 256000,
      ar: [{ id: '2116', name: '陈奕迅' }],
      al: {
        id: '137142551',
        name: '孤勇者',
        picUrl: 'http://p3.music.126.net/aG5zqxkBRfLiV7A8W0iwgA==/109951166702962263.jpg'
      }
    },
    {
      name: '好运来',
      mv: 1,
      fee: 1,
      id: '333750',
      dt: 213080,
      ar: [{ id: '10607', name: '祖海' }],
      al: {
        id: '32904',
        name: '再唱为了谁',
        picUrl: 'http://p3.music.126.net/akNK49GQjbJ4pzcfbAvRlQ==/900500023154501.jpg'
      }
    }
  ]
}

/**
 *
 * @returns 歌词列表
 */
const musicLyricListData = (): musicLyricsType[] => {
  return [
    {
      id: '1901371647',
      name: '孤勇者',
      text: '[00:00.000] 作词 : 唐恬\n[00:00.406] 作曲 : 钱雷\n[00:00.812] 编曲 : 钱雷\n[00:01.218] 制作人 : 钱雷\n[00:01.624] 吉他 : 高飞\n[00:02.030] 人声录音 : 利伟明\n[00:02.436] 人声录音室 : 雅旺录音室\n[00:02.842] 人声编辑 : 汝文博\n[00:03.248] 混音 : 周天澈\n[00:03.654] 母带 : 周天澈\n[00:04.63]词版权管理方：北京梦织音传媒有限公司\n[00:04.78]曲版权管理方：索尼音乐版权代理（北京）有限公司\n[00:04.92]录音作品及MV版权：EAS MUSIC LTD\n[00:05.00]联合出品：拳头游戏/腾讯游戏/腾讯视频\n[00:05.07]出品监制：霍锦 卢泓宇\n[00:22.29]都 是勇敢的\n[00:28.50]你额头的伤口 你的 不同 你犯的错\n[00:36.96]都 不必隐藏\n[00:43.20]你破旧的玩偶 你的 面具 你的自我\n[00:51.46]\n[00:51.76]他们说 要带着光 驯服每一头怪兽\n[00:58.65]他们说 要缝好你的伤 没有人爱小丑\n[01:05.98]为何孤独 不可 光荣\n[01:09.25]人只有不完美 值得歌颂\n[01:13.52]谁说污泥满身的不算英雄\n[01:20.50]\n[01:20.80]爱你孤身走暗巷\n[01:22.88]爱你不跪的模样\n[01:24.61]爱你对峙过绝望\n[01:26.41]不肯哭一场\n[01:28.05]\n[01:28.35]爱你破烂的衣裳\n[01:30.11]却敢堵命运的枪\n[01:31.95]爱你和我那么像\n[01:33.83]缺口都一样\n[01:35.23]\n[01:35.53]去吗？配吗？这褴褛的披风\n[01:39.43]战吗？战啊！以最卑微的梦\n[01:43.08]致那黑夜中的呜咽与怒吼\n[01:50.35]谁说站在光里的才算英雄\n[02:08.41]\n[02:08.71]他们说 要戒了你的狂 就像擦掉了污垢\n[02:16.25]他们说 要顺台阶而上 而代价是低头\n[02:23.33]那就让我 不可 乘风\n[02:26.59]你一样骄傲着 那种孤勇\n[02:31.07]谁说对弈平凡的不算英雄\n[02:38.05]\n[02:38.35]爱你孤身走暗巷\n[02:40.29]爱你不跪的模样\n[02:42.10]爱你对峙过绝望\n[02:43.85]不肯哭一场\n[02:45.92]\n[02:45.92]爱你破烂的衣裳\n[02:47.62]却敢堵命运的枪\n[02:49.43]爱你和我那么像\n[02:51.37]缺口都一样\n[02:52.86]\n[02:53.16]去吗？配吗？这褴褛的披风\n[02:56.85]战吗？战啊！以最卑微的梦\n[03:00.55]致那黑夜中的呜咽与怒吼\n[03:07.82]谁说站在光里的才算英雄\n[03:12.25]\n[03:12.55]你的斑驳 与众不同\n[03:19.89]你的沉默 震耳欲聋 You Are The Hero\n[03:26.14]\n[03:26.44]爱你孤身走暗巷\n[03:28.27]爱你不跪的模样\n[03:30.09]爱你对峙过绝望\n[03:31.94]不肯哭一场 (You Are The Hero)\n[03:33.45]\n[03:33.75]爱你来自于蛮荒\n[03:35.75]一生不借谁的光\n[03:37.43]你将造你的城邦\n[03:39.25]在废墟之上\n[03:40.72]\n[03:41.02]去吗？去啊！以最卑微的梦\n[03:44.85]战吗？战啊！以最孤高的梦\n[03:48.54]致那黑夜中的呜咽与怒吼\n[03:55.81]谁说站在光里的才算英雄\n'
    },
    {
      id: '333750',
      name: '好运来',
      text: '[00:00.000] 作词 : 车行\n[00:01.000] 作曲 : 戚建波\n[00:02.000] 编曲 : 张宏光\n[00:07.200]（好运来祝你好运来）\n[00:11.699]（好运带来了喜和爱）\n[00:15.689]（好运来我们好运来）\n[00:19.979]（迎着好运兴旺发达通四海）\n[00:28.989]叠个千纸鹤 再系个红飘带\n[00:32.998]愿善良的人们天天好运来\n[00:37.100]你勤劳生活美 你健康春常在\n[00:42.198]你一生的忙碌为了笑逐颜开\n[00:46.919]打个中国结 请春风剪个彩\n[00:50.948]愿祖国的日月年年好运来\n[00:55.209]你凤舞太平年 你龙腾新时代\n[00:59.705]你幸福的家园迎来百花盛开\n[01:05.213]好运来祝你好运来\n[01:10.485]好运带来了喜和爱\n[01:14.286]好运来 我们好运来\n[01:18.485]迎着好运兴旺发达通四海\n[01:33.096]叠个千纸鹤 再系个红飘带\n[01:37.295]愿善良的人们天天好运来\n[01:42.105]你勤劳生活美 你健康春常在\n[01:46.375]你一生的忙碌为了笑逐颜开\n[01:51.613]打个中国结 请春风剪个彩\n[01:55.887]愿祖国的日月年年好运来\n[01:59.994]你凤舞太平年 你龙腾新时代\n[02:04.984]你幸福的家园迎来百花盛开\n[02:09.804]好运来祝你好运来\n[02:14.022]好运带来了喜和爱\n[02:15.596]好运来 我们好运来\n[02:22.395]迎着好运兴旺发达通四海\n[02:26.806]好运来祝你好运来\n[02:31.165]好运带来了喜和爱\n[02:36.288]好运来 我们好运来\n[02:39.795]迎着好运兴旺发达通四海\n[03:00.135]好运来祝你好运来\n[03:04.584]好运带来了喜和爱\n[03:08.824]好运来 我们好运来\n[03:13.105]迎着好运兴旺发达通四海\n[03:17.462]通四海 好运来\n'
    }
  ]
}

/**
 *
 * @returns 歌词列表
 */
const musicSrcListData = (): musicSrcType[] => {
  return [
    {
      id: '1901371647',
      name: ['孤勇者'],
      src: [getAssetsDirFile('along.mp3')],
      format: ['mp3']
    },
    {
      id: '333750',
      name: ['好运来'],
      src: [getAssetsDirFile('luckly.mp3')],
      format: ['mp3']
    }
  ]
}

export { musicMenuListData, musicLyricListData, musicSrcListData }
