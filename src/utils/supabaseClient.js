import { v4 as uuidV4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM0NDg0MSwiZXhwIjoxOTU4OTIwODQxfQ.VjUOoc5WLIe7kTi3Ks3w56eoyuHHY_KUkSHdayZ9KLg';
const SUPABASE_URL = 'https://mkgmdrathlcedmfovtrq.supabase.co';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export class MessageModel {
  id;
  from;
  body;

  constructor({
    id,
    from,
    body
  }) {
    this.id = id || uuidV4();
    this.from = from;
    this.body = body;
  }
}

export class MessageRepository {
  async save(newMessage) {
    const { error } = await supabase
      .from('messages')
      .insert([ newMessage ])

    if (error) {
      console.log(error);
    };
  };

  async findAll() {
    const { data: messages, error } = await supabase
      .from('messages')
      .select()
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error);
    };

    return messages;
  };

  async delete(id) {
    const { error } = await supabase
      .from('messages')
      .delete()
      .match({ id })

    if (error) {
      console.error(error)
    }
  };

  listener(handleFunction) {
    supabase
      .from('messages')
      .on('INSERT', payload => {
        handleFunction(payload);
      })
      .on('DELETE', payload => {
        handleFunction(payload);
      })
      .subscribe();
  }
}