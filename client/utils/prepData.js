import { format } from "date-fns";


export default function prepData(data) {
  data.author_map = {};
  data.authors.forEach(author => {
    data.author_map[author.id] = author;
  });

  data.room_map = {};
  data.rooms.forEach(room => {
    data.room_map[room.id] = room;
  })
        
  data.talk_map = {};
  data.talks.forEach(talk => {
    talk.authors = talk.authors.map(a => data.author_map[a.id]);
    talk.room = data.room_map[talk.roomId];
    data.talk_map[talk.id] = talk
  });

  data.talkvotes.forEach(vote => {
    data.talk_map[vote.talkId].vote = vote.vote;
  });
                                                                                                               
  data.timeslot_map = {};
  data.timeslots.forEach(timeslot => {
    data.timeslot_map[timeslot.id] = timeslot;
    timeslot.talk_list = [];
    timeslot.time_display = format(timeslot.datetime,"h:mm a")
  });
  data.talks.forEach(talk => {
    talk.timeslot = data.timeslot_map[talk.timeslotId];
    talk.timeslot.talk_list.push(talk);
  });
  return data;
}