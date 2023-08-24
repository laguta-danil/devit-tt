import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { convert } from 'html-to-text';
import * as Parser from 'rss-parser';

import { PrismaService } from '../../database/prisma.service';

const parser = new Parser();

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  @Interval(120000)
  async getRssFeed() {
    const feed = await parser.parseURL(process.env.FEED_URL);

    try {
      feed.items.map(async post => {
        const imgUrl = convert(post.content, {
          selectors: [
            { format: 'skip', selector: 'a' },
            { format: 'skip', selector: 'p' }
          ],
          wordwrap: 130
        }).slice(1, -1);

        const description = convert(post.content, {
          selectors: [
            { format: 'skip', selector: 'a' },
            { format: 'skip', selector: 'img' }
          ],
          wordwrap: 130
        });
        await this.prisma.post.upsert({
          create: {
            author: post.creator,
            authorId: post.guid,
            categories: [...post.categories],
            description: description,
            imageUrl: imgUrl,
            link: post.link,
            pubDate: post.isoDate,
            title: post.title
          },
          update: {
            author: post.creator,
            authorId: post.guid,
            categories: [...post.categories],
            description: description,
            imageUrl: imgUrl,
            link: post.link,
            pubDate: post.isoDate,
            title: post.title
          },
          where: { link: post.link, title: post.title }
        });
      });
    } catch (error) {
      return 'rss parsing close with error';
    }
  }
}
